import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DiscussionBoard from "./pages/DiscussionBoard";
import HeroSection from "./pages/HeroSection";
import ThreeColumnSection from "./pages/ThreeColumnSection";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext";
import "./styles.css";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route
          path="/discussion"
          element={authUser ? <DiscussionBoard /> : <Navigate to="/" replace />}
        />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/three-column" element={<ThreeColumnSection />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
