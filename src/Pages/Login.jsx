import React from "react";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useDocumentTitle("Sign In | Eventr");
  const navigate = useNavigate();
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
                  <span className="btn form__btn btn--missing" type="submit">
                    Logga in
                  </span>
                </form>
                <button
                  className="btn form__btn"
                  type="submit"
                  onClick={() => navigate("/start")}
                >
                  Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
