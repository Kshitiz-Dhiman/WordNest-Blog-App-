import React from 'react'
import Navbar from '../components/Navbar'
const Home = () => {
    return (
        <div className='h-screen bg-gray-100'>
            <Navbar />
            <section class="bg-gray-100 py-20 px-6 text-center">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Discover Stories Worth Sharing
                    </h1>
                    <p class="text-lg md:text-xl text-gray-600 mb-8">
                        Dive into insightful blogs, follow your favorite authors, and share your own voice with the world.
                    </p>
                    <div class="flex justify-center gap-4">
                        <a href="/blogs" class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                            Explore Blogs
                        </a>
                        <a href="/authorship" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            Become an Author
                        </a>
                    </div>
                </div>
            </section>

            <section class="bg-gray-50 py-16 px-6">
                <div class="max-w-6xl mx-auto text-center">
                    <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        Why Choose Our Platform?
                    </h2>
                    <p class="text-md md:text-lg text-gray-600 mb-10">
                        We offer a seamless blogging experience for both readers and writers. Here's what makes us stand out:
                    </p>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h3 class="text-xl font-bold text-blue-600 mb-2">Curated Content</h3>
                            <p class="text-gray-600">Only high-quality, engaging articles make it to our front page.</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h3 class="text-xl font-bold text-blue-600 mb-2">Author Growth</h3>
                            <p class="text-gray-600">We support authors with tools and visibility to grow their audience.</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow">
                            <h3 class="text-xl font-bold text-blue-600 mb-2">Community Driven</h3>
                            <p class="text-gray-600">Readers and writers shape our content through feedback and engagement.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-gray-100 py-20 px-6">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
                    <div class="grid md:grid-cols-3 gap-10">
                        <div class="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
                            <img src="https://i.pravatar.cc/100?img=12" alt="Alex R." class="w-16 h-16 rounded-full mb-4" />
                            <p class="text-gray-700 italic mb-4">“This platform helped me reach a wide audience and grow my writing career!”</p>
                            <p class="font-semibold text-blue-700">Alex R.</p>
                        </div>
                        <div class="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
                            <img src="https://i.pravatar.cc/100?img=34" alt="Jamie L." class="w-16 h-16 rounded-full mb-4" />
                            <p class="text-gray-700 italic mb-4">“I love discovering fresh perspectives from writers around the world.”</p>
                            <p class="font-semibold text-blue-700">Jamie L.</p>
                        </div>
                        <div class="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
                            <img src="https://i.pravatar.cc/100?img=56" alt="Morgan K." class="w-16 h-16 rounded-full mb-4" />
                            <p class="text-gray-700 italic mb-4">“An intuitive and elegant space for both reading and writing blogs.”</p>
                            <p class="font-semibold text-blue-700">Morgan K.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-blue-600 text-white py-16 px-6 text-center">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Blogging Journey?</h2>
                    <p class="text-lg md:text-xl mb-8">Join our community of writers and readers today.</p>
                    <a href="/login" class="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
                        Get Started
                    </a>
                </div>
            </section>

        </div>
    )
}

export default Home
