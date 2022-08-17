import React, { useContext } from "react";
import {
  AccessTime,
  NoteAdd,
  ArrowBack,
  Home,
  History,
} from "@mui/icons-material";
import { db, auth } from "../Firebase/init";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import UserContext from "../UserContext";

const Add = () => {
  useDocumentTitle("Lägg till händelse | Eventr");
  /* FORM-VALUES */
  const [date, setDate] = React.useState([]);
  const [time, setTime] = React.useState([]);
  const [alarm, setAlarm] = React.useState([]);
  const [object, setObject] = React.useState([]);
  const [action, setAction] = React.useState([]);
  const [operator, setOperator] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [popUp, setPopUp] = React.useState(false);

  /* VARIABLES */
  const navigate = useNavigate();
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  /* FUNCTIONS */
  function createEvent(e) {
    e.preventDefault();
    const event = {
      date,
      time,
      alarm,
      object,
      action,
      location,
      operator,
    };
    addDoc(collection(db, "events"), event);
    setPopUp(true);
  }

  function addMoreEvents() {
    document.getElementById("add-event__form").reset();
    setPopUp(false);
  }

  function getDateAndTime() {
    const today = new Date();
    let monthNum;
    let dayNum;
    let hourNum;
    let minuteNum;
    {
      today.getMonth() + 1 > 9
        ? (monthNum = today.getMonth() + 1)
        : (monthNum = "0" + (today.getMonth() + 1));
    }
    {
      today.getDate() > 9
        ? (dayNum = today.getDate())
        : (dayNum = "0" + today.getDate());
    }
    {
      today.getHours() > 9
        ? (hourNum = today.getHours())
        : (hourNum = "0" + today.getHours());
    }
    {
      today.getMinutes() > 9
        ? (minuteNum = today.getMinutes())
        : (minuteNum = "0" + today.getMinutes());
    }
    setDate(today.getFullYear() + "-" + monthNum + "-" + dayNum);
    setTime(hourNum + ":" + minuteNum);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        getDateAndTime();
      } else navigate("/");
    });
  }, []);

  return (
    <main className={popUp ? "pop-up__background" : undefined}>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu">
              <div className="menu__body">
                {!user ? (
                  <>
                    <div className="skeleton sub-title__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton label__skeleton"></div>
                    <div className="skeleton input__skeleton"></div>
                    <div className="skeleton btn__skeleton"></div>
                  </>
                ) : (
                  <>
                    <button
                      className="menu__back"
                      onClick={() => navigate("/start")}
                    >
                      <ArrowBack />
                    </button>
                    <h3 className="menu__sub-title">Lägg till händelse:</h3>
                    <form
                      id="add-event__form"
                      className="menu__form"
                      onSubmit={(e) => createEvent(e)}
                    >
                      <label htmlFor="date">Datum:</label>
                      <input
                        type="date"
                        id="date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                      />
                      <label htmlFor="time">Tid:</label>
                      <input
                        type="time"
                        id="time"
                        required
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                      />
                      <label htmlFor="alarm">Typ av larm:</label>
                      <select
                        list="alarm"
                        required
                        defaultValue="DEFAULT"
                        onChange={(e) => setAlarm(e.target.value)}
                      >
                        <option value="DEFAULT" disabled></option>
                        <option value="Inbrottslarm">Inbrottslarm</option>
                        <option value="Automatlarm">Automatlarm</option>
                        <option value="Fellarm">Fellarm</option>
                        <option value="Sabotagelarm">Sabotagelarm</option>
                        <option value="Driftlarm">Driftlarm</option>
                        <option value="Övrigt/annat">Övrigt/annat</option>
                      </select>
                      <label htmlFor="object">Objekt:</label>
                      <input
                        type="text"
                        id="object"
                        required
                        onChange={(e) => setObject(e.target.value)}
                      />
                      <label htmlFor="location">Kommun:</label>

                      <select
                        list="location"
                        required
                        defaultValue="DEFAULT"
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="DEFAULT" disabled></option>
                        <option value="KGA">Karlskoga</option>
                        <option value="KHN">Kristinehamn</option>
                        <option value="FSD">Filipstad</option>
                        <option value="HFS">Hällefors</option>
                        <option value="DFS">Degerfors</option>
                        <option value="SFS">Storfors</option>
                        <option value="LSF">Lesjöfors</option>
                      </select>
                      <label htmlFor="action">Åtgärd:</label>
                      <input
                        type="text"
                        id="action"
                        required
                        onChange={(e) => setAction(e.target.value)}
                      />
                      <label htmlFor="operator">Operatör:</label>
                      <input
                        type="text"
                        id="operator"
                        maxLength="3"
                        required
                        onChange={(e) => setOperator(e.target.value)}
                      />
                      {alarm.length > 0 &&
                      object.length > 0 &&
                      location.length > 0 &&
                      action.length > 0 &&
                      operator.length > 0 ? (
                        <button type="submit" className="btn form__btn">
                          Lägg till händelse
                        </button>
                      ) : (
                        <span className="btn form__btn btn--missing">
                          Lägg till händelse
                        </span>
                      )}
                    </form>
                    <AccessTime className="icon-1" />
                    <NoteAdd className="icon-2" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="menu__pop-up--window">
          <div className="pop-up">
            <h4 className="menu__sub-title pop-up__title">Händelse tillagd!</h4>
            <h4 className="event__sub-title pop-up__sub-title">
              {" "}
              Vad vill du göra nu?
            </h4>
            <button className="btn" onClick={() => addMoreEvents()}>
              <NoteAdd />
              Lägg till ny händelse
            </button>
            <button className="btn" onClick={() => navigate("/events")}>
              <History />
              Visa händelser
            </button>
            <button className="btn" onClick={() => navigate("/start")}>
              <Home />
              Tillbaka till start
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Add;
