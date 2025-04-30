import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreateBlog = () => {
    const [formData, setFormData] = useState({ id: '', title: '', content: '' });
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isUpdateMode && currentBlogId) {
                const response = await axios.put(`http://localhost:3000/blog/update-blog/${currentBlogId}`, {
                    title: formData.title,
                    content: formData.content
                });
                console.log(response.data);
            } else {
                const response = await axios.post("http://localhost:3000/blog/create-blogs", formData);
                console.log(response.data);
            }

            setFormData({ id: '', title: '', content: '' });
            setIsModalOpen(false);
            setIsUpdateMode(false);
            setCurrentBlogId(null);
            fetchBlogs();
        } catch (e) {
            console.log(e);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/blog/get-blog");
            setBlogs(response.data);
        } catch (e) {
            console.log(e)
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/blog/delete-blog/${id}`);
            console.log(response.data);
            fetchBlogs();
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdate = (blog) => {
        setFormData({
            id: blog.id,
            title: blog.title,
            content: blog.content
        });
        setCurrentBlogId(blog.id);
        setIsUpdateMode(true);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateMode(false);
        setCurrentBlogId(null);
        setFormData({ id: '', title: '', content: '' });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="mt-8 w-5/6 mx-auto bg-gray-100 p-6 ">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Blogs</h2>
                    <button
                        type='button'
                        onClick={() => setIsModalOpen(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-2xl rounded-full px-6 absolute bottom-10 right-10 py-3.5 font-bold text-center"
                    >
                        +
                    </button>
                </div>
                <div className='flex flex-col gap-4'>
                    {blogs.map((blog) => (
                        <div key={blog._id} className="p-8 bg-gray-200 rounded-xl hover:bg-gray-300 transition duration-300 shadow-md ">
                            <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                            <p className="text-gray-600 mt-2">{blog.content}</p>
                            <p className="text-gray-500 mt-2">ID: {blog.id}</p>
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(blog.id)}
                                    className="bg-red-400 text-white px-3 py-2 hover:bg-red-800 transition-all rounded-xl focus:outline-none"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate(blog)}
                                    className="bg-green-400 text-white px-3 py-2 hover:bg-green-800 transition-all rounded-xl focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No blogs available.</p>
                )}
            </div>

            <div className={`${isModalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {isUpdateMode ? 'Update Blog' : 'Create New Blog'}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={closeModal}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isUpdateMode && (
                                    <div>
                                        <label htmlFor="id" className="block text-gray-700 font-medium mb-1">ID</label>
                                        <input
                                            type="text"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        {isUpdateMode ? 'Update Blog' : 'Create Blog'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
