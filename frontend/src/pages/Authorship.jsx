import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Authorship = () => {
    const [authorships, setAuthorships] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ blogId: '', authorId: '' });
    const [blogs, setBlogs] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAuthorships = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/authorship/get-authorship");
            setAuthorships(response.data);
            setError(null);
        } catch (e) {
            console.log(e);
            setError("Failed to fetch authorships");
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/blog/get-blog");
            setBlogs(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get("http://localhost:3000/user/get-user");
            setAuthors(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/authorship/create-authorship?blogId=${formData.blogId}&authorId=${formData.authorId}`);
            console.log(response.data);
            setFormData({ blogId: '', authorId: '' });
            setIsModalOpen(false);
            fetchAuthorships();
        } catch (e) {
            console.log(e);
            alert(e.response?.data?.message || "Failed to create authorship");
        }
    };

    useEffect(() => {
        fetchAuthorships();
        fetchBlogs();
        fetchAuthors();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ blogId: '', authorId: '' });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="mt-8 w-5/6 mx-auto bg-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Blog Authorships</h2>
                    <button
                        type='button'
                        onClick={() => setIsModalOpen(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-2xl rounded-full px-6 absolute bottom-10 right-10 py-3.5 font-bold text-center"
                    >
                        +
                    </button>
                </div>

                {loading && <p className="text-gray-600 text-center my-4">Loading authorships...</p>}

                {error && <p className="text-red-500 text-center my-4">{error}</p>}

                <div className='flex flex-col gap-4'>
                    {authorships.map((authorship) => (
                        <div key={authorship._id} className="p-6 bg-gray-200 rounded-xl hover:bg-gray-300 transition duration-300 shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Blog: {authorship.blogId?.title || "Unknown Blog"}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        Author: {authorship.authorId?.name || "Unknown Author"}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Blog ID: {authorship.blogId?.id}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Author ID: {authorship.authorId?.id}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {!loading && authorships.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No authorships available.</p>
                )}
            </div>

            {/* Create Authorship Modal */}
            <div className={`${isModalOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-100 bg-opacity-50`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Assign Author to Blog
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
                                <div>
                                    <label htmlFor="blogId" className="block text-gray-700 font-medium mb-1">Select Blog</label>
                                    <select
                                        name="blogId"
                                        value={formData.blogId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a blog</option>
                                        {blogs.map(blog => (
                                            <option key={blog._id} value={blog.id}>
                                                {blog.title} (ID: {blog.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="authorId" className="block text-gray-700 font-medium mb-1">Select Author</label>
                                    <select
                                        name="authorId"
                                        value={formData.authorId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select an author</option>
                                        {authors.map(author => (
                                            <option key={author._id} value={author.id}>
                                                {author.name} (ID: {author.id})
                                            </option>
                                        ))}
                                    </select>
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
                                        Assign Authorship
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

export default Authorship;
