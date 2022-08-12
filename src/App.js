import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import AddEvent from "./Pages/AddEvent";
import AllEvents from "./Pages/AllEvents";
import EditEvent from "./Pages/EditEvent";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/start" element={<Landing />}></Route>
          <Route path="/add" element={<AddEvent />}></Route>
          <Route path="/events" element={<AllEvents />}></Route>
          <Route path="/events/edit/:id" element={<EditEvent />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
