import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
    return (
        <div className='h-screen'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/user' element={<User />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
