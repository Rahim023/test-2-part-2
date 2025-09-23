import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DiscussionBoard from "./pages/DiscussionBoard";
import { AuthContext } from "./context/AuthContext"; // ✅ use context directly
import "./styles.css";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />

      {/* protect discussion route inline */}
      <Route
        path="/discussion"
        element={
          authUser ? <DiscussionBoard /> : <Navigate to="/" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
