import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Portfolio from './pages/Portfolio.tsx';
import StockDetail from './pages/StockDetail.tsx';
import Signup from './components/SignUp.js'; // Import the Signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stock/:symbol" element={<StockDetail />} /> {/* Dynamic route for stock details */}
        <Route path="/signup" element={<Signup />} /> {/* Add route for Signup */}
      </Routes>
    </Router>
  );
}

export default App;