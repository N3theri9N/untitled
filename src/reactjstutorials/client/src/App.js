import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
      <Router>
        <div>
          <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

//App.js 는 Routing 관련 일을 처리한다.
