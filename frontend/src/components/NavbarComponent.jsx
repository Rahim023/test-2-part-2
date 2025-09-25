import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { FaCopyright } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({ handleLogout }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "" });

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleCopyright = () => {
    alert("© 2025 " + (user.name || "User") + ". All rights reserved.");
  };

  return (
    <>
      <Navbar expand="lg" className="p-3" style={{ background: "linear-gradient(90deg, #ff6ec7, #8e2de2)" }}>
        <Container className="d-flex align-items-center justify-content-between">
          {/* Left: User Name */}
          <Navbar.Brand style={{ color: "#000", fontWeight: "bold", fontSize: "1.5rem" }}>
            {"Hello " + (user.name || "User") + "!"}
          </Navbar.Brand>

          {/* Center: Big Heading */}
          <div style={{ color: "#fff", fontSize: "2rem", fontWeight: "700", textAlign: "center", flex: 1 }}>
            Discussion Board
          </div>

          {/* Right: Custom Logout and Menu */}
          <div className="d-flex align-items-center gap-4">
            {/* Logout Button */}
            <div
              onClick={handleLogout}
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 8,
                fontWeight: "600",
                cursor: "pointer",
                textAlign: "center",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(90deg, #8e2de2, #ff6ec7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(90deg, #ff6ec7, #8e2de2)";
              }}
            >
              Logout
            </div>

            {/* Minimalist Menu Icon */}
            <div
              onClick={() => setShowMenu(true)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: 32,
                height: 24,
                cursor: "pointer"
              }}
            >
              <span style={{ display: "block", height: 3, backgroundColor: "#000", borderRadius: 2 }}></span>
              <span style={{ display: "block", height: 3, backgroundColor: "#000", borderRadius: 2 }}></span>
              <span style={{ display: "block", height: 3, backgroundColor: "#000", borderRadius: 2 }}></span>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas menu */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end" style={{ backgroundColor: "#000" }}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ color: "#fff" }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <div
              onClick={() => navigate("/hero")}
              style={{ background: "linear-gradient(90deg, #ff6ec7, #8e2de2)", color: "#fff", padding: "8px", borderRadius: 8, cursor: "pointer", textAlign: "center" }}
            >
              Hero Section
            </div>
            <div
              onClick={() => navigate("/three-column")}
              style={{ background: "linear-gradient(90deg, #ff6ec7, #8e2de2)", color: "#fff", padding: "8px", borderRadius: 8, cursor: "pointer", textAlign: "center" }}
            >
              Three Column Section
            </div>
            <div
              onClick={handleCopyright}
              style={{ background: "linear-gradient(90deg, #ff6ec7, #8e2de2)", color: "#fff", padding: "8px", borderRadius: 8, cursor: "pointer", textAlign: "center" }}
            >
              <FaCopyright /> Copyright
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
