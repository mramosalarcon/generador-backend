import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ConfigPage from './pages/ConfigPage';
import ProgressPage from './pages/ProgressPage';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
