import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center p-5 rounded-xl px-10 mt-2 mx-70 font-bold'>
            <div className='text-2xl text-gray-800'>

                <Link to="/">WordNest</Link>
            </div>
            <ul className='flex space-x-6 items-center'>
                <li className='text-lg text-gray-600 hover:text-gray-900 transition-colors'><Link to="/user">Users</Link></li>
                <li className='text-lg text-gray-600 hover:text-gray-900 transition-colors'><Link to="/blogs">Blogs</Link></li>
                <li className='text-lg text-gray-600 hover:text-gray-900 transition-colors'><Link to="/Authorship">Authorship</Link></li>
            </ul>
            <div><button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg text-md px-8 py-3 text-center transition-colors font-medium"
            >
                <Link to="/login">Create User</Link>
            </button></div>
        </div>
    );
}

export default Navbar;
