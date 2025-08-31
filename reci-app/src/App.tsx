import './App.css';
import Landing from './pages/landing_page/landing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from './pages/auth_pages/user_login';
import Register from './pages/auth_pages/register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
