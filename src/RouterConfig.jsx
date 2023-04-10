import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import Home from './pages/Home/Home';
import Error404 from './pages/error404/Error404';
import UI from './pages/UI/UI';

const RouterConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/ui" element={<DefaultLayout MainContentComponent={UI} />} />
                <Route path="/home" element={<DefaultLayout MainContentComponent={Home} />} />
                <Route path="/" element={<DefaultLayout MainContentComponent={Home} />} exact />
                <Route path="*" element={<DefaultLayout MainContentComponent={Error404} />} />
            </Routes>
        </Router>
    );
};

export default RouterConfig;
