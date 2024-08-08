import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Ensure you specify the Content-Type
          'projectId': 'tytpcwxgpttd',
        },
        body: JSON.stringify({ email, password, appType: 'bookingportals' }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (data.status === 'success') {
          alert('User signed in successfully');
          onSignIn(data.token);
          navigate('/');
        } else if (data.error && data.error === 'User not registered') {
          alert('User not registered. Please register first!');
        } else {
          alert('Sign in failed');
        }
      } else {
        alert('User not registered. Please register first! kk');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Sign in failed due to network error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200">
        Sign In
      </button>
      <p className="text-center mt-4 text-gray-600">
        Don't have an account? <Link to="/register" className="text-green-500 hover:underline">Register</Link>
      </p>
    </form>
  </div>
);
};export default SignIn;
