import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="register-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Register Card */}
      <div className="register-card">
        <h1 className="title">Join ISMT</h1>
        <p className="subtitle">
          Shape your future with excellence and innovation
        </p>

        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', Arial, sans-serif;
        }

        .register-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-image: url('https://ullens.edu.np/wp-content/themes/yootheme/cache/d4/home11banner-d4069d96.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        .register-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 380px;
          text-align: center;
          animation: fadeIn 1.2s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          color: #004aad;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 1rem;
          color: #444;
          margin-bottom: 25px;
        }

        .form input,
        .form select {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .form input:focus,
        .form select:focus {
          border-color: #004aad;
          box-shadow: 0 0 4px rgba(0, 74, 173, 0.3);
        }

        .form button {
          width: 100%;
          padding: 10px;
          background-color: #004aad;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form button:hover {
          background-color: #003080;
          transform: translateY(-2px);
        }

        .login-link {
          margin-top: 15px;
          font-size: 14px;
          color: #333;
        }

        .login-link a {
          color: #004aad;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .register-card {
            padding: 25px;
          }
          .title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
