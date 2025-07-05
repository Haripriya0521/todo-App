// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token) {
      api
        .get("/tasks")
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.error(err.response?.data || err.message);
        });
    }
  }, [token]);

  const resetForm = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("open");
    setPriority("medium");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate,
      status,
      priority,
    };

    if (editingTask) {
      api
        .put(`/tasks/${editingTask._id}`, payload)
        .then((res) => {
          setTasks((prev) =>
            prev.map((t) => (t._id === editingTask._id ? res.data : t))
          );
          resetForm();
        })
        .catch((err) => {
          console.error(err.response?.data || err.message);
        });
    } else {
      api
        .post("/tasks", payload)
        .then((res) => {
          setTasks((prev) => [...prev, res.data]);
          resetForm();
        })
        .catch((err) => {
          console.error(err.response?.data || err.message);
        });
    }
  };

  const handleDelete = (id) => {
    api
      .delete(`/tasks/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate?.slice(0, 10) || "");
    setStatus(task.status);
    setPriority(task.priority);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Your Tasks</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {user?.displayName && (
        <p className="welcome">
          Welcome, <strong>{user.displayName}</strong>!
        </p>
      )}

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </form>

      {tasks.length === 0 && <p className="no-tasks">No tasks yet.</p>}

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Due:</strong>{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
