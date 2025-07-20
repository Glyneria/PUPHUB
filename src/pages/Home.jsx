import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  Calendar,
  Zap,
  ArrowRight,
  X,
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Users className="h-6 w-6 text-red-400" />,
      title: 'Student & Org Roles',
      description: 'Easily switch between user and organization views.',
    },
    {
      icon: <Building2 className="h-6 w-6 text-red-400" />,
      title: 'Org Management',
      description: 'Manage your events, members, and branding in one place.',
    },
    {
      icon: <Calendar className="h-6 w-6 text-red-400" />,
      title: 'Event Scheduler',
      description: 'Plan, publish, and promote your upcoming activities.',
    },
    {
      icon: <Zap className="h-6 w-6 text-red-400" />,
      title: 'Real-time Updates',
      description: 'Stay updated with push notifications and alerts.',
    },
  ];

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', loginData);
  };

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Animated Background Glow */}
      <div
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-red-800 opacity-30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text text-transparent text-center mb-8">
          PUPHub: Your Event Connection
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-12 text-gray-300">
          Discover and join exciting university events, or host your own. Designed for students and orgs.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mb-16">
          <button
            onClick={() => navigate('/choose-role')}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              {feature.icon}
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
          <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => navigate('/choose-role')}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Choose Role</h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setShowLoginForm(true);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Login as Student
              </button>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setShowLoginForm(true);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Login as Organization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Form */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-30">
          <div className="bg-gray-900 p-8 rounded-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowLoginForm(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
