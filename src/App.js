import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import TopicBar from './components/TopicBar/TopicBar';

function App() {

  return (
    <Router>
      <TopicBar/>
      <Routes>
        <Route path="*" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
