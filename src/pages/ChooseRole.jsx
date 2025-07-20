import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
      <p className="text-gray-400 mb-12 text-center max-w-md">
        Are you an organization hosting events or a student attending them?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
        <button
          onClick={() => navigate('/signup/org')}
          className="bg-red-600 hover:bg-red-700 p-6 rounded-lg text-left rounded-2xl shadow-md transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-2">Organization</h2>
          <p className="text-gray-200">Host events, manage members, and publish announcements.</p>
        </button>

        <button
          onClick={() => navigate('/signup/user')}
          className="bg-red-600 hover:bg-red-700 p-6 rounded-lg text-left rounded-2xl shadow-md transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-2">Attendee</h2>
          <p className="text-gray-200">Join events, follow organizations, and stay informed.</p>
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
