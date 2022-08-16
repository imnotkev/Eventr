import React, { useContext } from "react";
import { CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(UserContext);
  return (
    <footer>
      <div className="footer__container">
        <div className="row">
          {user ? (
            <h1
              className="logo footer__logo"
              onClick={() => {
                navigate("/start");
              }}
            >
              <CalendarMonth />
              Eventr
            </h1>
          ) : (
            <h1 className="logo footer__logo logo__logged-out">
              <CalendarMonth />
              Eventr
            </h1>
          )}
          {user && (
            <div className="footer__anchors">
              <span className="footer__anchor" onClick={() => navigate("/add")}>
                Rapportera
              </span>
              <span
                className="footer__anchor"
                onClick={() => navigate("/events")}
              >
                Historik
              </span>
              <span className="footer__anchor" onClick={() => logOut()}>
                Logga ut
              </span>
            </div>
          )}
          <span className="footer__copyright">
            Copyright © 2022 Kevin Widing
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
