import React, { useContext } from "react";
import {
  CalendarMonth,
  Logout,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { ThemeContext } from "../App";
import "animate.css";

const Nav = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <div className="nav__container ">
        <div className="nav__container--left animate__animated animate__fadeIn ">
          {user ? (
            <h1
              className="logo nav__logo animate__animated animate__fadeIn"
              onClick={() => {
                navigate("/start");
              }}
            >
              <CalendarMonth />
              Eventr
            </h1>
          ) : (
            <h1 className="logo nav__logo logo__logged-out animate__animated animate__fadeIn">
              <CalendarMonth />
              Eventr
            </h1>
          )}
          {user && (
            <ul className="nav__list">
              <li className="nav__lists">
                <span
                  className="nav__list--anchor"
                  onClick={() => {
                    navigate("/add");
                  }}
                >
                  Rapportera händelse
                </span>
              </li>
              <li className="nav__lists">
                <span
                  className="nav__list--anchor"
                  onClick={() => {
                    navigate("/events");
                  }}
                >
                  Visa händelser
                </span>
              </li>
            </ul>
          )}
        </div>
        {user && (
          <div className="nav__container--right animate__animated animate__fadeIn">
            <span
              className="nav__list--anchor--primary"
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme === "light" ? <DarkMode /> : <LightMode />}
            </span>
            <span
              className="nav__list--anchor--primary"
              onClick={() => {
                logOut();
              }}
            >
              <Logout />
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
