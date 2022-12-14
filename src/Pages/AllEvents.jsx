import React, { useContext } from "react";
import {
  Delete,
  ArrowBack,
  Settings,
  RestartAlt,
  NoteAdd,
  Home,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowForward,
  Done,
} from "@mui/icons-material";
import { db, auth } from "../Firebase/init";

import {
  query,
  collection,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/UI/Pagination";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import UserContext from "../UserContext";

const History = () => {
  useDocumentTitle("Tidigare händelser | Eventr");
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);
  const [constResult, setConstResult] = React.useState([]);
  const [popUp, setPopUp] = React.useState(false);
  const [delEvent, setDelEvent] = React.useState([]);
  const [browseDate, setBrowseDate] = React.useState("");
  const [browseLocation, setBrowseLocation] = React.useState("DEFAULT");
  const [browseAlarm, setBrowseAlarm] = React.useState("DEFAULT");
  const [dateBtnActive, setDateBtnActive] = React.useState(false);
  const colRef = collection(db, "events");
  const navigate = useNavigate();
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  /* Pagination */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [eventsPerPage, setEventsPerPage] = React.useState(4);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = results.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /* Functions getting todays date and showing todays events */

  function getDate() {
    const today = new Date();
    let monthNum;
    let dayNum;
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
    const date = today.getFullYear() + "-" + monthNum + "-" + dayNum;
    setBrowseDate(date);
    getEvents(date);
  }

  async function getEvents(date) {
    setLoading(true);
    const eventsByDate = await query(
      colRef,
      where("date", "==", date),
      orderBy("time", "desc")
    );
    const data = await getDocs(eventsByDate);
    const events = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setResults(events);
    setConstResult(events);
    setCurrentPage(1);
    setBrowseLocation("DEFAULT");
    setBrowseAlarm("DEFAULT");
    setDateBtnActive(false);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }

  /* Functions filtering events by location/type */

  function filterLocation(location) {
    setCurrentPage(1);
    if (location === "DEFAULT" && browseAlarm === "DEFAULT") {
      setResults(constResult);
    } else if (location === "DEFAULT" && browseAlarm !== "DEFAULT") {
      setResults(constResult.filter((event) => event.alarm === browseAlarm));
    } else if (browseAlarm === "DEFAULT") {
      setResults(constResult.filter((event) => event.location === location));
    } else if (browseAlarm !== "DEFAULT") {
      setResults(
        constResult
          .filter((event) => event.location === location)
          .filter((event) => event.alarm === browseAlarm)
      );
    }
  }

  function filterAlarm(alarm) {
    setCurrentPage(1);
    if (alarm === "DEFAULT" && browseLocation === "DEFAULT") {
      setResults(constResult);
    } else if (alarm === "DEFAULT" && browseLocation !== "DEFAULT") {
      setResults(
        constResult.filter((event) => event.location === browseLocation)
      );
    } else if (browseLocation === "DEFAULT") {
      setResults(constResult.filter((event) => event.alarm === alarm));
    } else if (browseLocation !== "DEFAULT") {
      setResults(
        constResult
          .filter((event) => event.alarm === alarm)
          .filter((event) => event.location === browseLocation)
      );
    }
  }

  /* Functions regarding editing and deleting posts */

  function deletePost(id, date) {
    setPopUp(true);
    const eventId = id;
    const eventRef = doc(db, "events", eventId);
    deleteDoc(eventRef);
    getEvents(date);
    setPopUp(false);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        getDate();
      } else navigate("/");
    });
  }, []);

  return (
    <main className={popUp ? "pop-up__background" : undefined}>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div
              className="menu__body menu__body--history
            "
            >
              {!user ? (
                <div className="skeleton menu__title--skeleton"></div>
              ) : loading ? (
                <h2 className="menu__title animate__animated animate__fadeIn">
                  Laddar händelser..
                </h2>
              ) : (
                <>
                  <button
                    className="menu__back"
                    onClick={() => navigate("/start")}
                  >
                    <ArrowBack />
                  </button>
                  <h2 className="menu__title">Händelser:</h2>
                </>
              )}
              {loading ? (
                <>
                  <div className="skeleton event__header--skeleton"></div>
                  <div className="skeleton event__skeleton"></div>
                  <div className="skeleton event__skeleton"></div>
                  <div className="skeleton event__skeleton"></div>
                  <div className="skeleton event__skeleton"></div>
                </>
              ) : (
                <>
                  <div className="event__header event__header--desktop animate__animated animate__fadeIn animate__faster">
                    <div className="event__header--input--wrapper">
                      <h3 className="event__sub-title">Datum:</h3>
                      <form
                        className="event__header--form"
                        onSubmit={() => getEvents(browseDate)}
                      >
                        <input
                          type="date"
                          className="event__header--input"
                          value={browseDate}
                          onChange={(e) => {
                            setBrowseDate(e.target.value);
                            setDateBtnActive(true);
                          }}
                        ></input>
                        {dateBtnActive && (
                          <button className="btn event__header--btn">
                            <Done />
                          </button>
                        )}
                      </form>
                    </div>
                    <div className="event__header--input--wrapper">
                      <h3 className="event__sub-title">Kommun:</h3>
                      <select
                        list="location"
                        className="event__header--input"
                        value={browseLocation}
                        onChange={(e) => {
                          setBrowseLocation(e.target.value);
                          filterLocation(e.target.value);
                        }}
                      >
                        <option value="DEFAULT">Alla</option>
                        <option value="KGA">Karlskoga</option>
                        <option value="KHN">Kristinehamn</option>
                        <option value="FSD">Filipstad</option>
                        <option value="HFS">Hällefors</option>
                        <option value="DFS">Degerfors</option>
                        <option value="SFS">Storfors</option>
                        <option value="LSF">Lesjöfors</option>
                      </select>
                    </div>
                    <div className="event__header--input--wrapper">
                      <h3 className="event__sub-title">Larm:</h3>
                      <select
                        list="alarm"
                        className="event__header--input"
                        value={browseAlarm}
                        onChange={(e) => {
                          setBrowseAlarm(e.target.value);
                          filterAlarm(e.target.value);
                        }}
                      >
                        <option value="DEFAULT">Alla</option>
                        <option value="Inbrottslarm">Inbrottslarm</option>
                        <option value="Automatlarm">Automatlarm</option>
                        <option value="Fellarm">Fellarm</option>
                        <option value="Sabotagelarm">Sabotagelarm</option>
                        <option value="Driftlarm">Driftlarm</option>
                        <option value="Övrigt/annat">Övrigt/annat</option>
                      </select>
                    </div>
                  </div>
                  {/* MOBILE HEADER */}
                  {showFilter && (
                    <div className="event__header event__header--mobile animate__animated animate__fadeIn animate__faster">
                      <div className="event__header--input--wrapper">
                        <h3 className="event__sub-title">Datum:</h3>
                        <form
                          className="event__header--form"
                          onSubmit={() => {
                            getEvents(browseDate);
                            setShowFilter(false);
                          }}
                        >
                          <input
                            type="date"
                            className="event__header--input"
                            value={browseDate}
                            onChange={(e) => {
                              setBrowseDate(e.target.value);
                              setDateBtnActive(true);
                            }}
                          ></input>
                          {dateBtnActive && (
                            <button className="btn event__header--btn">
                              <Done />
                            </button>
                          )}
                        </form>
                      </div>
                      <div className="event__header--input--wrapper">
                        <h3 className="event__sub-title">Kommun:</h3>
                        <select
                          list="location"
                          className="event__header--input"
                          value={browseLocation}
                          onChange={(e) => {
                            setBrowseLocation(e.target.value);
                            filterLocation(e.target.value);
                          }}
                        >
                          <option value="DEFAULT">Alla</option>
                          <option value="KGA">Karlskoga</option>
                          <option value="KHN">Kristinehamn</option>
                          <option value="FSD">Filipstad</option>
                          <option value="HFS">Hällefors</option>
                          <option value="DFS">Degerfors</option>
                          <option value="SFS">Storfors</option>
                          <option value="LSF">Lesjöfors</option>
                        </select>
                      </div>
                      <div className="event__header--input--wrapper">
                        <h3 className="event__sub-title">Larm:</h3>
                        <select
                          list="alarm"
                          className="event__header--input"
                          value={browseAlarm}
                          onChange={(e) => {
                            setBrowseAlarm(e.target.value);
                            filterAlarm(e.target.value);
                          }}
                        >
                          <option value="DEFAULT">Alla</option>
                          <option value="Inbrottslarm">Inbrottslarm</option>
                          <option value="Automatlarm">Automatlarm</option>
                          <option value="Fellarm">Fellarm</option>
                          <option value="Sabotagelarm">Sabotagelarm</option>
                          <option value="Driftlarm">Driftlarm</option>
                          <option value="Övrigt/annat">Övrigt/annat</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {showFilter ? (
                    <button
                      className="btn filter__btn  animate__animated animate__fadeIn animate__faster"
                      onClick={() => setShowFilter(false)}
                    >
                      dölj <KeyboardArrowUp className="filter__btn--icon" />
                    </button>
                  ) : (
                    <button
                      className="btn filter__btn  animate__animated animate__fadeIn animate__faster"
                      onClick={() => setShowFilter(true)}
                    >
                      FILTER <KeyboardArrowDown className="filter__btn--icon" />
                    </button>
                  )}
                  <span className="event__date animate__animated animate__fadeIn">
                    Datum: {browseDate}
                  </span>
                  {results.length === 0 && (
                    <>
                      <h3 className="menu__sub-title no-results__title">
                        Inga händelser hittades!
                      </h3>
                      <h4 className="event__sub-title no-results__sub-title">
                        Justera filter eller:
                      </h4>
                      <button className="btn" onClick={() => getDate()}>
                        <RestartAlt /> Nollställ
                      </button>
                      <button className="btn" onClick={() => navigate("/add")}>
                        <NoteAdd /> Lägg till händelse
                      </button>
                      <button
                        className="btn"
                        onClick={() => navigate("/start")}
                      >
                        <Home /> Tillbaka till start
                      </button>
                    </>
                  )}
                  {currentEvents.map((event) => (
                    <div
                      className="event animate__animated animate__fadeIn animate__faster"
                      key={event.id}
                    >
                      <div className="event__left-col">
                        <div className="col__container--1">
                          <h3 className="event__time">{event.time}</h3>
                        </div>
                        <div className="col__container--2">
                          <h4 className="event__location">{event.location}</h4>
                        </div>
                        <div className="col__container--3">
                          <h3 className="event__title">
                            {event.alarm} - {event.object}
                          </h3>
                          <p className="event__action">{event.action}</p>
                        </div>
                      </div>
                      <div className="event__right-col">
                        <h4 className="event__operator">{event.operator}</h4>
                        <Settings
                          onClick={() => navigate(`/events/edit/${event.id}`)}
                        />
                        <Delete
                          onClick={() => {
                            setPopUp(true);
                            setDelEvent({
                              id: event.id,
                              date: event.date,
                              alarm: event.alarm,
                              object: event.object,
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {results.length > 0 && (
                    <h3 className="event__sub-title event__total animate__animated animate__fadeIn animate__faster">
                      Antal händelser: {results.length}
                    </h3>
                  )}
                  {results.length > 4 && (
                    <Pagination
                      eventsPerPage={eventsPerPage}
                      totalEvents={results.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="menu__pop-up--window">
          <div className="pop-up">
            <h3 className="menu__sub-title pop-up__title">
              Är du säker att du vill ta bort:
            </h3>
            <h4 className="event__sub-title pop-up__sub-title">
              "{delEvent.alarm} - {delEvent.object}"
            </h4>
            <button
              className="btn"
              onClick={() => deletePost(delEvent.id, delEvent.date)}
            >
              <Delete />
              Ta bort
            </button>
            <button className="btn" onClick={() => setPopUp(false)}>
              <ArrowBack />
              Tillbaka
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default History;
