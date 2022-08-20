import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import AddEvent from "./Pages/AddEvent";
import AllEvents from "./Pages/AllEvents";
import EditEvent from "./Pages/EditEvent";
import LogIn from "./Pages/LogIn";
import { UserProvider } from "./UserContext";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <UserProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <div className="app" id={theme}>
            <Nav />
            <Routes>
              <Route path="/" element={<LogIn />}></Route>
              <Route path="/start" element={<Landing />}></Route>
              <Route path="/add" element={<AddEvent />}></Route>
              <Route path="/events" element={<AllEvents />}></Route>
              <Route path="/events/edit/:id" element={<EditEvent />}></Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeContext.Provider>
    </UserProvider>
  );
}

export default App;
