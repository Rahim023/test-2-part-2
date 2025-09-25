import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);

  const heroStyle = {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI3M3wwfDF8c2VhfHx8fG1vb258ZW58MHx8fHwxNjk2MjU4Njc3&ixlib=rb-4.0.3&q=80&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
    opacity: 0.3,
    zIndex: 1,
  };

  return (
    <section style={heroStyle}>
      {/* Gradient overlay */}
      <div style={overlayStyle}></div>

      {/* Hero Text */}
      <motion.h1
        className="hero-text"
        style={{ zIndex: 2, color: "white", textAlign: "center", textShadow: "2px 2px 8px #000" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Hero Section <FaStar color="#f3ec78" />
      </motion.h1>

      <motion.p
        className="hero-text"
        style={{ zIndex: 2, color: "white", textAlign: "center", maxWidth: "600px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        Experience smooth animations, gradients, and responsive design.
      </motion.p>

      {/* Popup button */}
      <motion.button
        style={{
          zIndex: 2,
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setShowPopup(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open Popup
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                borderRadius: "16px",
                padding: "30px",
                textAlign: "center",
                color: "white",
                minWidth: "300px",
                maxWidth: "90%",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 700, damping: 20 }}
            >
              <h2>Hello from Popup!</h2>
              <p>This is a smooth animated popup using Framer Motion.</p>
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#000",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HeroSection;
