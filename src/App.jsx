import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import UserPage from "./pages/UserPage";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userDetails/:id" element={<UserPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
