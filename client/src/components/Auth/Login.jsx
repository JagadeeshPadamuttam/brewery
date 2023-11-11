
 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Login successful!');
        alert("Login Succesful");
        navigate('/search');
      } else {
        console.error('Login failed. Check your credentials.');
       alert(" check your password and username")
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
     alert(" Server Error wait for some time!!")
    }
  };

  return (
    <form className="form-layout" onSubmit={handleSubmit}>
      <h2>LOGIN </h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="form-layout input"
        placeholder="Enter your username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="form-layout input"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" className="form-layout button">
        Submit
      </button>
    </form>
  );
}

export default Login;

