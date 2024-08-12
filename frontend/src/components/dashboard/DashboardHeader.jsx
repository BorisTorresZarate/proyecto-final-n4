import React from 'react';
import { useUser } from '../../services/UserContext';
import { Link, useLocation } from 'wouter';
import { RiLogoutCircleLine } from 'react-icons/ri';

function DashboardHeader({ userNombre }) {
  const { logout } = useUser();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img src="/logologin.jpeg" alt="torres del norte" className="h-10 w-auto" />
            <h1 className="ml-3 text-xl font-bold">Hotel Torres del Norte</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Bienvenido {userNombre}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
            >
              <RiLogoutCircleLine className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;