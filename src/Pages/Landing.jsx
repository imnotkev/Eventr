import React, { useContext } from "react";
import {
  NoteAdd,
  History,
  CalendarMonth,
  Logout,
  FireExtinguisher,
  NotificationsNone,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import UserContext from "../UserContext";
import { auth } from "../Firebase/init";
import { onAuthStateChanged } from "firebase/auth";

const Landing = () => {
  const { user, logOut, setLoggedIn, setUser } = useContext(UserContext);
  useDocumentTitle("Start | Eventr");
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else navigate("/");
    });
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu__body">
              <div className="menu__content animate__animated animate__fadeIn animate__faster">
                {!user ? (
                  <div className="skeleton menu__title--skeleton"></div>
                ) : (
                  <h2 className="menu__title">Välkommen till Eventr!</h2>
                )}
                {!user ? (
                  <div className="menu__loading">
                    {" "}
                    <div className="skeleton sub-title__skeleton"></div>
                    <div className="skeleton btn__skeleton"></div>
                    <div className="skeleton btn__skeleton"></div>
                    <div className="skeleton btn__skeleton"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="menu__sub-title">Vad vill du göra?</h3>
                    <button className="btn" onClick={() => navigate("/add")}>
                      <NoteAdd />
                      Rapportera händelse
                    </button>
                    <button className="btn" onClick={() => navigate("/events")}>
                      <History />
                      Visa händelser
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      <Logout />
                      Logga ut
                    </button>
                  </>
                )}
              </div>
              <FireExtinguisher className="icon-1" />
              <NotificationsNone className="icon-2" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
