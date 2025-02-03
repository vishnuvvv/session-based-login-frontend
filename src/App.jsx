import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import UserPage from "./pages/UserPage";
import AddUser from "./pages/AddUser";

// Protected Route component to guard private routes
const ProtectedRoute = ({ element, redirectTo }) => {
  const localuser = localStorage.getItem("user");

  if (!localuser) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

function App() {
  const [user, setUser] = useState(() => {
    // Get user data from localStorage safely
    const localUser = localStorage.getItem("user");
    try {
      return localUser ? JSON.parse(localUser) : null;
    } catch (error) {
      console.error("Error parsing localStorage user:", error);
      return null;
    }
  });

  useEffect(() => {
    // Update user state when localStorage changes
    const handleStorageChange = () => {
      const localUser = localStorage.getItem("user");
      try {
        setUser(localUser ? JSON.parse(localUser) : null);
      } catch (error) {
        console.error("Error parsing localStorage user on update:", error);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/userDetails/:id"
          element={<ProtectedRoute element={<UserPage />} redirectTo="/" />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPanel />} redirectTo="/" />}
        />
        <Route
          path="/addUser"
          element={<ProtectedRoute element={<AddUser />} redirectTo="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
