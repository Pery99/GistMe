import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/layouts/MainLayout";
import Chat from "./components/pages/Chat";
import Friends from "./components/pages/Friends";
import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";
import FriendProfile from "./components/pages/FriendProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddFriends from "./components/pages/AddFriends";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="friends/add" element={<AddFriends />} /> {/* Order matters - specific routes first */}
          <Route path="friends/:id" element={<FriendProfile />} />
          <Route path="friends" element={<Friends />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
