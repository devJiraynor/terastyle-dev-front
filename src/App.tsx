import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Search from './views/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:searchPocketmonName/:selectedType' element={<Search />} />
    </Routes>
  );
}

export default App;
