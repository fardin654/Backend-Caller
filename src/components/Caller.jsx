import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Caller = () => {
  const [loading, setLoading] = useState(false);

  const callBackendServer = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jumma-backend.onrender.com/api/wallets');
      if (response.status === 200) {
        console.log('Backend server is running:', response.data);
        toast.success('Backend server is now active!');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to activate backend server');
    } finally {
      setLoading(false);
    }
  };

  const callChatServer = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://youchatapp.onrender.com/api/auth/register',
        {
          username: "testuser",
          email: "testuser@example.com",
          password: "12345678"
        }
      );
      if (response.status === 200) {
        console.log('ChatApp Backend server is running:', response.data);
        toast.success('ChatApp Backend server is now active!');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('Failed to activate chat backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callBackendServer();
    callChatServer();

    const interval = setInterval(() => {
      callBackendServer();
      callChatServer();
    }, 240000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <button
        onClick={callBackendServer}
        disabled={loading}
        className="cursor-pointer px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Activating...' : 'Activate Backend Server'}
      </button>
    </div>
  );
};

export default Caller;
