import { useEffect, useState } from "react";
import api from "../api/api";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/teachers/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/teachers", form);
      }
      setForm({ name: "", email: "", subject: "" });
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error saving teacher");
    }
  };

  const handleEdit = (teacher) => {
    setForm({ name: teacher.name, email: teacher.email, subject: teacher.subject });
    setEditingId(teacher._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error deleting teacher");
    }
  };

  return (
    <div className="teachers-page">
      <h1>Manage Teachers</h1>

      <form onSubmit={handleSubmit} className="teacher-form">
        <input
          placeholder="Name"
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
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update Teacher" : "Add Teacher"}</button>
      </form>

      <ul className="teacher-list">
        {teachers.map((t) => (
          <li key={t._id} className="teacher-item">
            <span>{t.name} ({t.email}) — Subject: {t.subject}</span>
            <div className="teacher-actions">
              <button onClick={() => handleEdit(t)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(t._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <style>{`
        .teachers-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #cce3f7, #f0f5ff);
          font-family: 'Poppins', Arial, sans-serif;
          padding: 40px 20px;
        }

        h1 {
          text-align: center;
          color: #004aad;
          font-size: 28px;
          margin-bottom: 30px;
        }

        .teacher-form {
          max-width: 450px;
          margin: 0 auto 40px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .teacher-form input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .teacher-form input:focus {
          border-color: #004aad;
          box-shadow: 0 0 5px rgba(0, 74, 173, 0.3);
        }

        .teacher-form button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background-color: #004aad;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .teacher-form button:hover {
          background-color: #003080;
          transform: translateY(-2px);
        }

        .teacher-list {
          max-width: 600px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .teacher-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-radius: 12px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .teacher-actions button {
          padding: 6px 12px;
          margin-left: 6px;
          border-radius: 6px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background-color: #ffc107;
          color: #1a1a1a;
        }

        .edit-btn:hover {
          background-color: #e0a800;
        }

        .delete-btn {
          background-color: #dc3545;
          color: #fff;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }

        @media (max-width: 600px) {
          .teacher-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .teacher-actions {
            display: flex;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Teachers;
