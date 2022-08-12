import React from "react";
import { CalendarMonth, Logout, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__container--left">
          <h1
            className="logo nav__logo"
            onClick={() => {
              navigate("/start");
            }}
          >
            <CalendarMonth />
            Eventr
          </h1>
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
        </div>
        <div className="nav__container--right">
          {/* <span className="nav__list--anchor--user">
            <Person />
            LC
          </span> */}
          <span
            className="nav__list--anchor--primary"
            onClick={() => {
              navigate("/");
            }}
          >
            <Logout />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
