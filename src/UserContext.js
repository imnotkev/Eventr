import { createContext, useState } from "react";
import { auth } from "../src/Firebase/init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logOut = () => {
    signOut(auth);
    setUser(false);
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loggedIn,
        setUser,
        setLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
