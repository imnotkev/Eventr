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
  const [loading, setLoading] = React.useState(false);
  const [faultyLogin, setFaultyLogin] = React.useState(false);

  function logInUser(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    setLoading(true);
    setFaultyLogin(false);
    setTimeout(() => {
      signInWithEmailAndPassword(auth, `${userEmail}`, `${userPassword}`)
        .then(({ user }) => {
          logIn({ user });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setFaultyLogin(true);
          setUserEmail("");
          setUserPassword("");
        });
    }, 240);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        navigate("/start");
      }
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="menu--wrapper">
            {loading ? (
              <div className="menu__body">
                <div className="spinning-dots"></div>
                <Login className="icon-1" />
                <AccessibilityNew className="icon-2" />
              </div>
            ) : (
              <div className="menu__body">
                <div className="menu__content  animate__animated animate__fadeIn animate__faster">
                  <h2 className="menu__title">Logga in:</h2>
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
                      className="login__input"
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
                      className="login__input"
                    />
                    {!userPassword || !userEmail ? (
                      <span
                        className="btn login__btn btn--missing"
                        type="submit"
                      >
                        Logga in
                      </span>
                    ) : (
                      <button className="btn login__btn" type="submit">
                        Logga in
                      </button>
                    )}
                  </form>
                  <div className="demo-login">
                    DEMO: <br />
                    email: demo@gmail.com <br />
                    password: password
                  </div>
                </div>
                <Login className="icon-1" />
                <AccessibilityNew className="icon-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
