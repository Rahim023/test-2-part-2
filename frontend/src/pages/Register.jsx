import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setAuthUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff0080, #7928ca, #000000)",
        color: "white",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "350px",
          backgroundColor: "rgba(0,0,0,0.85)",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 15px rgba(255,0,128,0.4)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow =
            "0 0 25px rgba(255,0,128,0.7), 0 0 35px rgba(121,40,202,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(255,0,128,0.4)";
        }}
      >
        <h3 className="text-center mb-3 fw-bold">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister} className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control bg-dark text-white border-0"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control bg-dark text-white border-0"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control bg-dark text-white border-0"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn fw-bold"
            style={{
              background: "linear-gradient(90deg, #ff0080, #7928ca)",
              color: "white",
              border: "none",
              transition: "all 0.4s ease",
              boxShadow: "0 0 12px rgba(255,0,128,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(255,0,128,0.8), 0 0 30px rgba(121,40,202,0.8)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(255,0,128,0.5)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Register
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-light">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
