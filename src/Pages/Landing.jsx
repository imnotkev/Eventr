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

const Landing = () => {
  const { user, logOut } = useContext(UserContext);
  useDocumentTitle("Start | Eventr");
  const navigate = useNavigate();

  React.useEffect(() => {
    {
      !user && navigate("/");
    }
  }, [user]);

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu">
              <div className="menu__header">
                <h2 className="menu__title">Välkommen till Eventr!</h2>
              </div>
              <div className="menu__body">
                <h3 className="menu__sub-title">Vad vill du göra?</h3>
                <button className="btn" onClick={() => navigate("/add")}>
                  <NoteAdd />
                  Rapportera händelse
                </button>
                <button className="btn" onClick={() => navigate("/events")}>
                  <History />
                  Visa händelser
                </button>
                <span className="btn btn--missing">
                  <CalendarMonth />
                  Kalender
                </span>
                <span className="btn btn--missing">
                  <Settings />
                  Inställningar
                </span>
                <button
                  className="btn"
                  onClick={() => {
                    logOut();
                  }}
                >
                  <Logout />
                  Logga ut
                </button>
                <FireExtinguisher className="icon-1" />
                <NotificationsNone className="icon-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
