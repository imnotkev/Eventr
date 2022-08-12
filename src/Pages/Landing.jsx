import React from "react";
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

const Landing = () => {
  useDocumentTitle("Start | Eventr");
  const navigate = useNavigate();

  return (
    <header>
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
                <button className="btn btn--missing">
                  <CalendarMonth />
                  Kalender
                </button>
                <button className="btn btn--missing">
                  <Settings />
                  Inställningar
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/");
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
    </header>
  );
};

export default Landing;
