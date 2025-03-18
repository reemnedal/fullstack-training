import { useState } from 'react'

import './App.css'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/molecules/Nav';
import About from './components/pages/AboutPage';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App
