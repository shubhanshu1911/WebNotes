
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup"
import Alert from "./Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "../context/notes/noteState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <NoteState>
      <div>
        <Router>
          <Header />
          <Alert alert = {alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert = {showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>

        <Footer />
      </div>
    </NoteState>
  );
}

export default App;
