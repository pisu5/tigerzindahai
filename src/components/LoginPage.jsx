// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "../firebaseConfig"; // Import Firebase config
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const database = getDatabase(firebaseApp); // Use Firebase app instance
  const auth = getAuth(firebaseApp); // Get Firebase auth instance

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle Sign Up
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details in the Realtime Database (excluding password)
        const userId = user.uid;
        await set(ref(database, 'users/' + userId), {
          email: user.email,
        });

        console.log('User signed up and saved in the database');
        navigate('/dashboard'); // Redirect to dashboard or another page
      } catch (error) {
        console.error('Error signing up:', error.message);
        alert(error.message); // Show error to user
      }
    } else {
      // Handle Log In
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
        navigate('/dashboard'); // Redirect to dashboard or another page
      } catch (error) {
        console.error('Error logging in:', error.message);
        alert(error.message); // Show error to user
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="path/to/your/logo.png" // Replace with your logo path
            alt="Aneja Mall Logo"
            className="h-12"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Aneja Mall</h2>
        <p className="mt-2 text-gray-600 text-center">
          {isSignUp ? 'Create a new account' : 'Log in to your account'}
        </p>
        <form onSubmit={handleAuth} className="mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
