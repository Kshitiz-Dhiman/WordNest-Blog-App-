import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Login = () => {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/create-user', userData);

            console.log(response.message);
        } catch (e) {
            alert(e.response.data.message);
        }
        setUserData({
            id: '',
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className='h-screen bg-gray-100'>
            <Navbar />
            <section className="flex items-center justify-center bg-gray-100 py-12 px-6 mt-10">
                <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create User</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="id">ID</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={userData.id}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                            Create User
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;
