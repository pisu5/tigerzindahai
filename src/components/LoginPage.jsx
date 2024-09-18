import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "../firebaseConfig"; // Import Firebase config
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import logo from "../assets/anejamalllogo.jpg";

const LoginPage = () => {
  const database = getDatabase(firebaseApp); // Use Firebase app instance
  const auth = getAuth(firebaseApp); // Get Firebase auth instance

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('unmarried');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isFromGwalior, setIsFromGwalior] = useState(false);
  const [favWear, setFavWear] = useState('lehenga'); // Default selection
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
  const [forgotPassword, setForgotPassword] = useState(false); // Toggle Forgot Password
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (forgotPassword) {
      // Handle Password Reset
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent!');
        setForgotPassword(false); // Return to login/signup
      } catch (error) {
        console.error('Error sending password reset email:', error.message);
        alert(error.message); // Show error to user
      }
    } else if (isSignUp) {
      // Handle Sign Up
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details in the Realtime Database (excluding password)
        const userId = user.uid;
        await set(ref(database, 'users/' + userId), {
          email: user.email,
          name: name,
          age: age,
          maritalStatus: maritalStatus,
          address: address,
          phone: phone,
          city: city,
          country: country,
          isFromGwalior: isFromGwalior,
          favWear: favWear
        });

        console.log('User signed up and saved in the database');
        navigate('/home'); // Redirect to dashboard or another page
      } catch (error) {
        console.error('Error signing up:', error.message);
        alert(error.message); // Show error to user
      }
    } else {
      // Handle Log In
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
        navigate('/home'); // Redirect to dashboard or another page
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
            src={logo} // Replace with your logo path
            alt="Aneja Mall Logo"
            className="h-12"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Aneja Mall</h2>
        <p className="mt-2 text-gray-600 text-center">
          {forgotPassword ? 'Reset your password' : isSignUp ? 'Create a new account' : 'Log in to your account'}
        </p>
        <form onSubmit={handleAuth} className="mt-8">
          {forgotPassword ? (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send Password Reset Email
              </button>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setForgotPassword(false)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Back to {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </>
          ) : (
            <>
              {isSignUp && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
                    <select
                      id="maritalStatus"
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="unmarried">Unmarried</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="isFromGwalior" className="block text-sm font-medium text-gray-700">Are you from Gwalior?</label>
                    <input
                      type="checkbox"
                      id="isFromGwalior"
                      checked={isFromGwalior}
                      onChange={(e) => setIsFromGwalior(e.target.checked)}
                      className="mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="favWear" className="block text-sm font-medium text-gray-700">Favorite Wear</label>
                    <select
                      id="favWear"
                      value={favWear}
                      onChange={(e) => setFavWear(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="lehenga">Lehenga</option>
                      <option value="tops">Tops</option>
                      <option value="suits">Suits</option>
                      <option value="sarees">Sarees</option>
                      {/* Add more options if needed */}
                    </select>
                  </div>
                </>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          {forgotPassword ? (
            <button
              onClick={() => setForgotPassword(false)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Back to {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          ) : isSignUp ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 hover:underline"
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
