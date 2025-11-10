import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles.css';

const API = "http://localhost/answerme/backend/public/api";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) {
      setMessage('Please select your role.');
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
        role
      });

      if (res.data.success) {
        setMessage('Login successful!');
        console.log('User:', res.data.user);
        // redirect example
        // window.location.href = '/dashboard';
      } else {
        setMessage(res.data.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Network error. Check backend!');
      }
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <main className="wrapper">
      <aside className="hero">
        <img src="/img/logo.png" alt="AnswerMe logo" className="logo" />
        <h1 className="brand">ANSWER ME.</h1>
        <p className="hero-sub">A simple Q&A platform</p>
      </aside>

      <section className="card">
        <h2 className="title">WELCOME BACK</h2>

        <form id="loginForm" className="form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="pw-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye"
              onClick={togglePassword}
              aria-label="toggle password"
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>

          <label className="label">Select Role</label>
          <div className="role-grid">
            <div
              className={`role ${role === 'student' ? 'role-selected' : ''}`}
              onClick={() => setRole('student')}
            >
              <img src="/img/student.png" alt="Student" />
              <span>Student</span>
            </div>
            <div
              className={`role ${role === 'teacher' ? 'role-selected' : ''}`}
              onClick={() => setRole('teacher')}
            >
              <img src="/img/teacher.png" alt="Teacher" />
              <span>Teacher</span>
            </div>
          </div>

          <button className="btn" type="submit">Log In</button>
        </form>

        <p className="small">Don't have an account? <a href="/signup">Sign Up</a></p>
        {message && <div id="msg" className="message" aria-live="polite">{message}</div>}
      </section>
    </main>
  );
}

export default Login;

