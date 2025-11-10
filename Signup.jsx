import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles.css';

const API = "http://localhost/answerme/backend/public/api";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [msg, setMsg] = useState('');

  const selectRole = (r) => {
    setRole(r);
    document.querySelectorAll('.role').forEach(b => b.classList.remove('role-selected'));
    const el = document.querySelector(`.role[data-role="${r}"]`);
    if (el) el.classList.add('role-selected');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Please wait...');
    try {
      const res = await axios.post(`${API}/signup`, {
        full_name: name,
        email,
        password,
        role
      });

      if (res.data.success) {
        setMsg(res.data.message);
        setTimeout(() => window.location.href = '/login', 1200);
      } else {
        setMsg(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMsg(err.response.data.message);
      } else {
        setMsg('Network error. Check backend!');
      }
    }
  };

  return (
    <main className="wrapper">
      <div className="page-bg">
        <div className="glow glow-left"></div>
        <div className="glow glow-right"></div>
      </div>

      <aside className="hero">
        <img src="/img/logo.png" alt="AnswerMe logo" className="logo" />
        <h1 className="brand">ANSWER ME.</h1>
        <p className="hero-sub">Join as Teacher or Student</p>
      </aside>

      <section className="card">
        <h2 className="title">CREATE ACCOUNT</h2>

        <form id="signupForm" className="form" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            placeholder="Full name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <label className="label">Select Role</label>
          <div className="role-grid">
            <button
              type="button"
              className={`role ${role === 'student' ? 'role-selected' : ''}`}
              data-role="student"
              onClick={() => selectRole('student')}
            >
              <img src="/img/student.png" alt="student" />
              <span>Student</span>
            </button>

            <button
              type="button"
              className={`role ${role === 'teacher' ? 'role-selected' : ''}`}
              data-role="teacher"
              onClick={() => selectRole('teacher')}
            >
              <img src="/img/teacher.png" alt="teacher" />
              <span>Teacher</span>
            </button>
          </div>

          <button className="btn" type="submit">Sign Up</button>
        </form>

        <p className="small">Already have an account? <a href="/login">Log In</a></p>
        <div id="msg" className="message" aria-live="polite">{msg}</div>
      </section>
    </main>
  );
}
