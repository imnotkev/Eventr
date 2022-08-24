import React, { useContext } from "react";
import {
  CalendarMonth,
  Logout,
  DarkMode,
  LightMode,
  Menu,
  SubdirectoryArrowRight,
  Close,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { ThemeContext } from "../App";
import logo from "../Assets/logo.png";
import "animate.css";

const Nav = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = React.useState(false);

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
              <img className="logo__img" src={logo} />
              Eventr
            </h1>
          ) : (
            <h1 className="logo nav__logo logo__logged-out animate__animated animate__fadeIn">
              <img className="logo__img" src={logo} />
              Eventr
            </h1>
          )}
          {user && (
            <ul className="nav__list nav__list--desktop">
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
          <>
            <div className="nav__container--right nav__list--desktop animate__animated animate__fadeIn">
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
            <div className="nav__container--right nav__list--mobile animate__animated animate__fadeIn">
              {!menuOpen ? (
                <span
                  className="nav__list--anchor--primary"
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                >
                  <Menu />
                </span>
              ) : (
                <span
                  className="nav__list--anchor--primary"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <Close />
                </span>
              )}
            </div>
          </>
        )}
        {!user && (
          <div className="nav__container--right nav__list--desktop animate__animated animate__fadeIn">
            <span
              className="nav__list--anchor--primary"
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme === "light" ? <DarkMode /> : <LightMode />}
            </span>
          </div>
        )}
        {!user && (
          <div className="nav__container--right nav__list--mobile animate__animated animate__fadeIn">
            <span
              className="nav__list--anchor--primary"
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme === "light" ? <DarkMode /> : <LightMode />}
            </span>
          </div>
        )}
      </div>
      {/* MOBILE-MENU */}
      {user && (
        <>
          <div
            className={
              menuOpen ? "mobile__menu mobile__menu--open" : "mobile__menu"
            }
          >
            <ul className="nav__list nav__list--mobile">
              <li className="nav__lists">
                <span
                  className="nav__list--anchor"
                  onClick={() => {
                    navigate("/add");
                    setMenuOpen(false);
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
                    setMenuOpen(false);
                  }}
                >
                  Visa händelser
                </span>
              </li>
              <li className="nav__lists">
                <span
                  className="nav__list--anchor"
                  onClick={() => {
                    toggleTheme();
                  }}
                >
                  Nattläge{" "}
                  {theme === "light" ? <CheckBoxOutlineBlank /> : <CheckBox />}
                </span>
              </li>
              <li className="nav__lists">
                <span
                  className="nav__list--anchor"
                  onClick={() => {
                    logOut();
                    setMenuOpen(false);
                  }}
                >
                  Logga ut
                </span>
              </li>
            </ul>

            <SubdirectoryArrowRight className="icon-1" />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
