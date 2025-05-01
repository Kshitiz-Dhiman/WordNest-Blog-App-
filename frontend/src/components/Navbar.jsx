import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex flex-wrap justify-between items-center p-5 rounded-xl px-5 sm:px-10 mt-2 mx-50 font-bold'>
            <div className='text-xl sm:text-2xl text-gray-800 flex items-center'>
                <img className='rounded-full h-10'
                    src="https://img.favpng.com/19/16/16/computer-icons-blogger-logo-png-favpng-B7KarAb7aWnaBXeV9dtiJcVjb.jpg" alt="" />
                <Link to="/">WordNest</Link>
            </div>
            <ul className='flex flex-wrap space-x-4 sm:space-x-6 items-center mt-3 sm:mt-0'>
                <li className='text-sm sm:text-lg text-gray-600 hover:text-gray-900 transition-colors'>
                    <Link to="/user">Users</Link>
                </li>
                <li className='text-sm sm:text-lg text-gray-600 hover:text-gray-900 transition-colors'>
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li className='text-sm sm:text-lg text-gray-600 hover:text-gray-900 transition-colors'>
                    <Link to="/Authorship">Authorship</Link>
                </li>
            </ul>
            <div className='mt-3 sm:mt-0'>
                <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg text-sm sm:text-md px-6 sm:px-8 py-2 sm:py-3 text-center transition-colors font-medium"
                >
                    <Link to="/login">Create User</Link>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
