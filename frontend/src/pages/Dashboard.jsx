import { Link } from "react-router-dom";

const Dashboard = () => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <header className="dashboard-header">
        <h1>ISMT College Management</h1>
        <div className="user-role">
          <span>{name}</span> | <span>{role?.toUpperCase()}</span>
        </div>
      </header>

      {/* Welcome Message */}
      <section className="welcome-section">
        <h2>Welcome, {name}!</h2>
        <p>Your role: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </section>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        {role === "admin" && (
          <>
            <Link to="/students" className="dashboard-card">
              <div className="card-icon">🎓</div>
              <div className="card-text">Students</div>
            </Link>
            <Link to="/teachers" className="dashboard-card">
              <div className="card-icon">👨‍🏫</div>
              <div className="card-text">Teachers</div>
            </Link>
            <Link to="/courses" className="dashboard-card">
              <div className="card-icon">📚</div>
              <div className="card-text">Courses</div>
            </Link>
          </>
        )}

        {role === "teacher" && (
          <Link to="/students" className="dashboard-card">
            <div className="card-icon">👩‍🎓</div>
            <div className="card-text">Students</div>
          </Link>
        )}

        {role === "student" && (
          <div className="dashboard-card">
            <div className="card-icon">📝</div>
            <div className="card-text">Your Assignments</div>
          </div>
        )}
      </div>

      {/* Embedded CSS */}
      <style>{`
        /* Overall Page */
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #cce3f7, #f0f5ff);
          font-family: 'Poppins', sans-serif;
          color: #2c3e50;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .dashboard-header {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .dashboard-header h1 {
          font-size: 22px;
          color: #1a237e;
          font-weight: 600;
          margin: 0;
        }

        .user-role {
          font-size: 15px;
          color: #555;
          font-weight: 500;
        }

        /* Welcome Section */
        .welcome-section {
          text-align: center;
          margin-top: 40px;
          animation: fadeIn 1.2s ease-in-out;
        }

        .welcome-section h2 {
          font-size: 30px;
          font-weight: 700;
          color: #0d47a1;
        }

        .welcome-section p {
          font-size: 18px;
          color: #555;
        }

        /* Cards Container */
        .dashboard-cards {
          margin-top: 50px;
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          padding: 0 20px;
        }

        /* Individual Card */
        .dashboard-card {
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          text-decoration: none;
          color: #1a237e;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
          background: rgba(255, 255, 255, 0.95);
        }

        .card-icon {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .card-text {
          font-size: 18px;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-card {
            width: 150px;
            height: 150px;
          }

          .card-icon {
            font-size: 40px;
          }

          .card-text {
            font-size: 16px;
          }

          .welcome-section h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
