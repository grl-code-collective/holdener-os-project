import React from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="bg-navbar-blue text-white h-12 text-3xl">
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar}>
                        <FaBars className="h-6 w-6 text-white" />
                    </button>
                    <Link to={'/'} className="pl-3">
                        IT 342
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link to={'/'} className="flex items-center">
                        <FaUser className="h-6 w-6 text-white" />
                        <span className="ml-2 text-xl">User</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
