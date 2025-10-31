// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem("role") || "guest";

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
//       <div className="flex gap-4 font-bold">
//         <Link to="/">Dashboard</Link>
//         {userRole === "admin" && <>
//           <Link to="/students">Students</Link>
//           <Link to="/teachers">Teachers</Link>
//         </>}
//         {userRole === "teacher" && <Link to="/students">Students</Link>}
//         {userRole === "student" && <Link to="/dashboard">My Info</Link>}
//       </div>
//       {userRole !== "guest" && (
//         <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Logout</button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "guest";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {userRole === "admin" && (
          <>
            <Link to="/students">Students</Link>
            <Link to="/teachers">Teachers</Link>
          </>
        )}
        {userRole === "teacher" && <Link to="/students">Students</Link>}
        {userRole === "student" && <Link to="/dashboard">My Info</Link>}
      </div>

      {userRole !== "guest" && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background-color: #f8f9fa; /* light gray */
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 10px;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .nav-left {
          display: flex;
          gap: 16px;
          font-weight: 500;
        }

        .nav-left a {
          color: #333;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 8px;
          transition: background-color 0.3s, color 0.3s, transform 0.2s;
        }

        .nav-left a:hover {
          background-color: #007bff;
          color: #fff;
          transform: translateY(-2px);
        }

        .logout-btn {
          background-color: #ff6b6b;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .logout-btn:hover {
          background-color: #e63946;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .nav-left {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
