import React, { useContext } from "react";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Login, AccessibilityNew } from "@mui/icons-material";

const LogIn = () => {
  useDocumentTitle("Sign In | Eventr");
  const navigate = useNavigate();
  const { user, logIn } = useContext(UserContext);

  React.useEffect(() => {
    {
      user && navigate("/start");
    }
  }, [user]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu">
              <div className="menu__header">
                <h2 className="menu__title">Vänligen logga in:</h2>
              </div>
              <div className="menu__body">
                <form action="" className="login__form">
                  <label htmlFor="email" className="login__label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="example@domain.com"
                  />
                  <label htmlFor="password" className="login__label">
                    Lösenord:
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    placeholder="***********"
                  />
                  <span className="btn login__btn btn--missing" type="submit">
                    Logga in
                  </span>
                </form>
                <button
                  className="btn login__btn"
                  onClick={() => {
                    logIn();
                  }}
                >
                  Demo
                </button>
                <Login className="icon-1" />
                <AccessibilityNew className="icon-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
