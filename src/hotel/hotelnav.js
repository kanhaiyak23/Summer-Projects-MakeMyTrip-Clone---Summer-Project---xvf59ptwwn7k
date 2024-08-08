import React from 'react';
import { Link } from 'react-router-dom';
// { isAuthenticated, onLogout }
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="bg-white-200">
    <nav className="bg-blue-1000 p-4 text-white flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold"><img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Makemytrip_logo.svg" alt="Make My Trip" class="h-12"/></Link>
      </div>
      <div>̦
        {isAuthenticated ? (
          <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <Link to="/signin" className="bg-green-500 px-4 py-2 rounded">Login or Create Account</Link>
          
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
