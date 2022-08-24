import React, { useContext } from "react";
import { CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import logo from "../Assets/logo.png";
import "animate.css";

const Footer = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(UserContext);
  return (
    <footer>
      <div className="footer__container ">
        <div className="row">
          {user ? (
            <h1 className="logo footer__logo animate__animated animate__fadeIn">
              <img
                className=" logo__img--footer"
                src={logo}
                onClick={() => {
                  navigate("/start");
                }}
              />
            </h1>
          ) : (
            <h1 className="logo footer__logo logo__logged-out animate__animated animate__fadeIn">
              <img className="logo__img--footer" src={logo} />
            </h1>
          )}
          <span className="footer__copyright animate__animated animate__fadeIn">
            Copyright © 2022 Kevin Widing
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
