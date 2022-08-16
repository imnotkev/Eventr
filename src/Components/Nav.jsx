import React, { useContext } from "react";
import { CalendarMonth, Logout, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Nav = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(UserContext);

  return (
    <nav>
      <div
        className={
          user ? "nav__container" : "nav__container nav__container--logged-out"
        }
      >
        <div className="nav__container--left">
          {user ? (
            <h1
              className="logo nav__logo"
              onClick={() => {
                navigate("/start");
              }}
            >
              <CalendarMonth />
              Eventr
            </h1>
          ) : (
            <h1 className="logo nav__logo logo__logged-out">
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
          <div className="nav__container--right">
            <span className="nav__list--anchor--user">
              <Person />
              demo user
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
