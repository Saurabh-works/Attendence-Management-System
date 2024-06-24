import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        (u) => u.userid === userid && u.password === password && u.role === role
      );

      if (user) {
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'student') {
          navigate('/student');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching users', error);
      alert('Error logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserID:</label>
          <input
            type="text"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
    </div>
  );
}

export default Login;
