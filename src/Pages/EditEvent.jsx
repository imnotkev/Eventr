import React, { useContext } from "react";
import { db, auth } from "../Firebase/init";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  History,
  ArrowBack,
  Settings,
  AutoFixHigh,
} from "@mui/icons-material";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import UserContext from "../UserContext";

const Event = () => {
  useDocumentTitle("Redigera händelse | Eventr");
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [popUp, setPopUp] = React.useState(false);
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  /* FORM-VALUES */
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [alarm, setAlarm] = React.useState("");
  const [object, setObject] = React.useState("");
  const [action, setAction] = React.useState("");
  const [operator, setOperator] = React.useState("");
  const [location, setLocation] = React.useState("");

  /* Edit function */
  async function updatePost(e) {
    e.preventDefault();
    const eventId = id;
    const eventRef = doc(db, "events", eventId);
    const newEvent = {
      date,
      time,
      alarm,
      object,
      action,
      location,
      operator,
    };
    updateDoc(eventRef, newEvent);
    setPopUp(true);
  }

  /* Fetching chosen event by ID */
  async function getPostById() {
    let event;
    const eventRef = doc(db, "events", id);
    const eventSnap = await getDoc(eventRef);
    event = eventSnap.data();
    setDate(event.date);
    setTime(event.time);
    setAlarm(event.alarm);
    setObject(event.object);
    setAction(event.action);
    setOperator(event.operator);
    setLocation(event.location);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        getPostById();
      } else navigate("/");
    });
  }, []);

  return (
    <main className={popUp ? "pop-up__background" : undefined}>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu__body">
              {loading ? (
                <div className="menu__content animate__animated animate__fadeIn animate__faster">
                  <div className="skeleton sub-title__skeleton"></div>
                  <div className="skeleton event-edit__skeleton event-edit"></div>
                  <div className="menu__form">
                    <div className="menu__form-half">
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                    </div>
                    <div className="menu__form-half">
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__input">
                        <div className="skeleton label__skeleton"></div>
                        <div className="skeleton input__skeleton"></div>
                      </div>
                      <div className="form__btn--wrapper">
                        <div className="skeleton btn__skeleton form__btn"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="menu__content animate__animated animate__fadeIn">
                  <button
                    className="menu__back"
                    onClick={() => navigate("/events")}
                  >
                    <ArrowBack />
                  </button>
                  <h3 className="menu__sub-title">Redigera händelse:</h3>
                  <div className="event-edit">
                    <div className="event animate__animated animate__fadeIn animate__faster">
                      <div className="event__left-col">
                        <div className="col__container--1">
                          <h3 className="event__time">{time}</h3>
                        </div>
                        <div className="col__container--2">
                          <h4 className="event__location">{location}</h4>
                        </div>
                        <div className="col__container--3">
                          <h3 className="event__title">
                            {alarm} - {object}
                          </h3>
                          <p className="event__action">{action}</p>
                        </div>
                      </div>
                      <div className="event__right-col">
                        <h4 className="event__operator">{operator}</h4>
                      </div>
                      <div className="event__edit-col"></div>
                    </div>
                  </div>
                  <form className="menu__form" onSubmit={(e) => updatePost(e)}>
                    <div className="menu__form-half">
                      <div className="form__input">
                        <label htmlFor="date">Datum:</label>
                        <input
                          type="date"
                          id="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="form__input">
                        <label htmlFor="time">Tid:</label>
                        <input
                          type="time"
                          id="time"
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                      <div className="form__input">
                        <label htmlFor="alarm">Typ av larm:</label>
                        <select
                          list="alarm"
                          required
                          value={alarm}
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
                      </div>
                      <div className="form__input">
                        <label htmlFor="object">Objekt:</label>
                        <input
                          type="text"
                          id="object"
                          required
                          value={object}
                          onChange={(e) => setObject(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="menu__form-half">
                      <div className="form__input">
                        <label htmlFor="location">Kommun:</label>
                        <select
                          list="location"
                          required
                          value={location}
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
                      </div>
                      <div className="form__input">
                        <label htmlFor="action">Åtgärd:</label>
                        <input
                          type="text"
                          id="action"
                          required
                          value={action}
                          onChange={(e) => setAction(e.target.value)}
                        />
                      </div>
                      <div className="form__input">
                        <label htmlFor="operator">Operatör:</label>
                        <input
                          type="text"
                          id="operator"
                          required
                          maxLength="3"
                          value={operator}
                          onChange={(e) => setOperator(e.target.value)}
                        />{" "}
                      </div>
                      <div className="form__btn--wrapper">
                        {alarm.length > 0 &&
                        object.length > 0 &&
                        location.length > 0 &&
                        action.length > 0 &&
                        operator.length > 0 ? (
                          <button type="submit" className="btn form__btn">
                            Spara
                          </button>
                        ) : (
                          <span className="btn form__btn form__btn--missing">
                            Spara
                          </span>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              )}
              <AutoFixHigh className="icon-1" />
              <Settings className="icon-2" />
            </div>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="menu__pop-up--window ">
          <div className="pop-up">
            <h4 className="menu__sub-title">Händelse uppdaterad!</h4>

            <button
              onClick={() => navigate("/events")}
              className="btn pop-up__btn"
            >
              <History />
              Tillbaka till händelser
            </button>
            <button
              onClick={() => navigate("/start")}
              className="btn pop-up__btn"
            >
              <Home /> Tillbaka till hem
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Event;
