import Landing from './pages/landing_page/landing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from './pages/auth_pages/user_login';
import Register from './pages/auth_pages/register';
import UserHome from './pages/user_pages/user_home';
import UserProfile from './pages/user_pages/userProfile';
import ProtectedRoute from './components/protected_route';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/user-home"
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        progressClassName="custom-progress"
      />
    </>

  );
}

export default App;
