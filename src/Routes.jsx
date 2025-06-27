
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Redirector from './pages/Redirector';
import { useState } from 'react';

export default function AppRoutes() {
    const [shortenedUrls, setShortenedUrls] = useState({});

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home shortened={shortenedUrls} setShortened={setShortenedUrls} />} />
                <Route path="/:code" element={<Redirector mapping={shortenedUrls} />} />
            </Routes>
        </BrowserRouter>
    );
}