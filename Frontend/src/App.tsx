import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Userprofile from "./components/userprofile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/userprofile" element={<Userprofile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
