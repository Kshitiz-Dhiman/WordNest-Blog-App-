import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import Blog from './pages/Blog';
import Authorship from './pages/Authorship';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
    return (
        <div className='h-screen'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/blogs' element={<Blog />} />
                    <Route path='/authorship' element={<Authorship />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
