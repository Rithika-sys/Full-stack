// imports
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Ensure this is correctly linked
// State Variables
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
// handleLogin Function
  const handleLogin = async (e) => {
    e.preventDefault();
// Check if inputs are filled
    if (username && password) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        // Handle the response
        const data = await response.json();
        console.log(data,'res')
        if (response.ok) {
          // Successful login, navigate to home page
          console.log('Login successful', data);
          navigate('/home');
        } else {
          // If login fails, set the error message
          setError(data.message || 'Login failed. Please check your credentials.');
        }
      } catch (err) {
        // Handle any network or server errors
        console.error('Error during login:', err);
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('Please enter both username and password.');
    }
  };
  // JSX Structure (Login Form)
  return (
    <div className="login-box">
      <h1>Cream Collar</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {error && <p className="error">{error}</p>}
        <div className="centered-links">
          <p><Link to="/signup" className="signup-link">Don't have an account? Sign up for free</Link></p>
          <p><Link to="/forgot-password">Forgot password?</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
