import React, { useState } from 'react';
import { supabase } from "../lib/supabase";
import { signIn } from '../services/auth.js';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'; // adjust path if it's different
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };


  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async () => {
    const { email, password, role } = formData;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Redirect based on role
      if (role === 'org') {
        navigate('/org/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const { user, role } = useAuth();

  useEffect(() => {
    if (user && role) {
      if (role === 'user') navigate('/user/dashboard');
      else if (role === 'org') navigate('/org/dashboard');
    }
  }, [user, role]);

  return (
    <div className="min-h-screen bg-gray-950 w-full flex flex-col relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative w-full max-w-md z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4 border border-red-500/30">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to PUPHub</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl p-8">
            <div className="space-y-6">
              {/* Role Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">I am a</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-800/50 rounded-lg">
                  {['user', 'org'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        formData.role === role
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      }`}
                    >
                      {role === 'user' ? 'Regular User' : 'Organization'}
                    </button>
                  ))}
                </div>
              </div>


              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-colors"
                />
              </div>


              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-colors"
                />
              </div>


              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}


              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-[1.02]'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>


              {/* Additional Links */}
              <div className="text-center space-y-2">
                <button className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Forgot your password?
                </button>
                <div className="text-sm text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup/user">
                    <button className="text-red-400 hover:text-red-300 transition-colors font-medium">
                      Sign up here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              © 2025 PUPHub. Built for Polytechnic University of the Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;


