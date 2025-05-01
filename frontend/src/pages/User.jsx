import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [isloading, setisLoading] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            setisLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-user`);
                setUsers(response.data);
                setisLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className='min-h-screen bg-gray-100'>
            <Navbar />
            <section className='flex flex-col items-center justify-center px-4 mt-12'>
                <div className='w-full max-w-4xl'>
                    <h2 className='text-2xl font-semibold mb-4 text-center'>User List</h2>
                    <div className='overflow-x-auto bg-white shadow rounded-lg'>
                        <table className='w-full table-auto'>
                            <thead className='bg-gray-200 text-gray-700'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>ID</th>
                                    <th className='px-4 py-3 text-left'>Name</th>
                                    <th className='px-4 py-3 text-left'>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isloading ? (
                                    <div className='flex w-full justify-center items-center h-10'>
                                        loading...
                                    </div>
                                ) : users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id} className='border-b hover:bg-gray-100'>
                                            <td className='px-4 py-2'>{user.id}</td>
                                            <td className='px-4 py-2'>{user.name}</td>
                                            <td className='px-4 py-2'>{user.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default User;
