import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/discussion");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff0080, #7928ca, #000000)",
        color: "white",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "350px",
          backgroundColor: "rgba(0,0,0,0.85)",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
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
        <h3 className="text-center mb-3 fw-bold">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3 bg-dark text-white border-0 shadow-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ transition: "box-shadow 0.3s ease" }}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 10px rgba(255,0,128,0.7), 0 0 20px rgba(121,40,202,0.7)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <input
            type="password"
            className="form-control mb-3 bg-dark text-white border-0 shadow-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ transition: "box-shadow 0.3s ease" }}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 10px rgba(255,0,128,0.7), 0 0 20px rgba(121,40,202,0.7)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <button
            type="submit"
            className="btn w-100 mt-2 fw-bold"
            style={{
              background: "linear-gradient(90deg, #ff0080, #7928ca)",
              border: "none",
              color: "white",
              letterSpacing: "1px",
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
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register" className="text-light text-decoration-none me-2">
            Register
          </Link>
          |
          <Link to="/forgot" className="text-light text-decoration-none ms-2">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
