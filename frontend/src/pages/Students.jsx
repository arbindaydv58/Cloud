import { useEffect, useState } from "react";
import api from "../api/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/students", form);
      }
      setForm({ name: "", email: "", age: "" });
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error saving student");
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email, age: student.age });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error deleting student");
    }
  };

  return (
    <div className="students-page">
      <h1>Manage Students</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="student-form">
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
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* List */}
      <ul className="student-list">
        {students.map((s) => (
          <li key={s._id} className="student-item">
            <span>{s.name} ({s.email}) — Age: {s.age}</span>
            <div className="student-actions">
              <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(s._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Embedded CSS */}
      <style>{`
        .students-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #cce3f7, #f0f5ff);
          font-family: 'Poppins', Arial, sans-serif;
          padding: 40px 20px;
        }

        .students-page h1 {
          text-align: center;
          color: #004aad;
          font-size: 28px;
          margin-bottom: 30px;
        }

        .student-form {
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

        .student-form input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .student-form input:focus {
          border-color: #004aad;
          box-shadow: 0 0 5px rgba(0, 74, 173, 0.3);
        }

        .student-form button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background-color: #004aad;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .student-form button:hover {
          background-color: #003080;
          transform: translateY(-2px);
        }

        .student-list {
          max-width: 600px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-radius: 12px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .student-actions button {
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
          .student-form, .student-list {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Students;
