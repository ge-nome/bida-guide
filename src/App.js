import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accept from './student/accept';
import Book from './student/book';
import Home from './student/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id/:name" element={<Book />} />
          <Route path="/directions/:from/:to" element={<Accept />} />
          <Route path="/directions/:from/:to" element={<Accept />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
