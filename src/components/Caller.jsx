import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Caller = () => {

    const [loading, setLoading] = useState(false);

    const callBackendServer = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/');
            if (response.status === 200) {
                console.log('Backend server is running:', response.data);
                toast.success('Backend server is now active!');
                toast.info(response.data);
            }
        }
        catch (error) {
            toast.error('Failed to activate backend server');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            callBackendServer();
        }, 10000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <button
                onClick={callBackendServer}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? 'Activating...' : 'Activate Backend Server'}
            </button>
        </div>
    )
}

export default Caller
