import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-card">
        <h1>Welcome to ISMT</h1>
        <p>Empowering students with knowledge and innovation</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      <style>{`
        /* Background */
        .login-page {
          position: relative;
          min-height: 100vh;
          background-image: url('https://img.freepik.com/free-photo/free-time-students-bachelor-s-campus-life-rhythm-five-friendly-students-are-walking_8353-6408.jpg?semt=ais_hybrid&w=740&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }

        /* Overlay blur */
        .overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 0;
        }

        /* Login card */
        .login-card {
          position: relative;
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 400px;
          padding: 40px 30px;
          text-align: center;
          animation: fadeIn 1s ease-in-out;
        }

        .login-card h1 {
          font-size: 28px;
          color: #1e3a8a;
          margin-bottom: 10px;
        }

        .login-card p {
          color: #555;
          font-size: 15px;
          margin-bottom: 25px;
        }

        /* Form styles */
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s ease-in-out;
        }

        input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
        }

        button {
          padding: 12px;
          background-color: #1e3a8a;
          color: white;
          font-weight: bold;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s;
        }

        button:hover {
          background-color: #15317e;
          transform: scale(1.02);
        }

        .register-text {
          margin-top: 15px;
          font-size: 14px;
          color: #444;
        }

        .register-text a {
          color: #1e3a8a;
          text-decoration: none;
          font-weight: 600;
        }

        .register-text a:hover {
          text-decoration: underline;
        }

        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 500px) {
          .login-card {
            padding: 30px 20px;
          }
          .login-card h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
