import React, { useContext } from "react";
import useDocumentTitle from "../Components/UI/DynamicTitle";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Login, AccessibilityNew } from "@mui/icons-material";
import { auth } from "../Firebase/init";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LogIn = () => {
  useDocumentTitle("Sign In | Eventr");
  const navigate = useNavigate();
  const { setUser, setLoggedIn, logIn } = useContext(UserContext);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [popUp, setPopUp] = React.useState(false);
  const [faultyLogin, setFaultyLogin] = React.useState(false);

  function logInUser(e) {
    e.preventDefault();
    setPopUp(true);
    setFaultyLogin(false);
    signInWithEmailAndPassword(auth, `${userEmail}`, `${userPassword}`)
      .then(({ user }) => {
        logIn({ user });
        setPopUp(false);
      })
      .catch(() => {
        setFaultyLogin(true);
        setPopUp(false);
        setUserEmail("");
        setUserPassword("");
      });
  }

  function logInDemo() {
    setPopUp(true);
    setFaultyLogin(false);
    signInWithEmailAndPassword(auth, `demo@gmail.com`, `password`)
      .then(({ user }) => {
        logIn({ user });
        setPopUp(false);
      })
      .catch(() => {
        setFaultyLogin(true);
      });
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        navigate("/start");
      }
    });
  }, []);

  return (
    <section className={popUp ? "pop-up__background" : undefined}>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            <div className="menu">
              <div className="menu__header">
                <h2 className="menu__title">Vänligen logga in:</h2>
              </div>
              <div className="menu__body">
                {faultyLogin && (
                  <div className="faulty-login">
                    Fel e-postadress eller lösenord! <br />
                    Försök igen.
                  </div>
                )}
                <form onSubmit={(e) => logInUser(e)} className="login__form">
                  <label htmlFor="email" className="login__label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="example@domain.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <label htmlFor="password" className="login__label">
                    Lösenord:
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    placeholder="***********"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  {!userPassword || !userEmail ? (
                    <span className="btn login__btn btn--missing" type="submit">
                      Logga in
                    </span>
                  ) : (
                    <button className="btn login__btn" type="submit">
                      Logga in
                    </button>
                  )}
                </form>
                {/* <button
                  className="btn login__btn"
                  onClick={() => {
                    logInDemo();
                  }}
                >
                  Demo
                </button> */}
                <div className="demo-login">
                  För demo: <br />
                  demo@gmail.com <br />
                  password
                </div>
                <Login className="icon-1" />
                <AccessibilityNew className="icon-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {popUp && (
        <div className="menu__pop-up--window">
          <div className="pop-up">
            <h4 className="menu__sub-title pop-up__title">Loggar in..</h4>
            <div className="double-up"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LogIn;
