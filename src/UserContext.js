import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(false);

  const logIn = () => {
    setUser(true);
  };

  const logOut = () => {
    setUser(false);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
