import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Courses from './components/Courses';
import Genres from './components/Genres';
import Header from './components/Header';
import Popular from './components/Popular';
import Similar from './components/Similar';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
          <Route path='/' element={<Popular/>}/>
          <Route path='/similar/:id' element={<Similar/>}/>
          <Route path='/genres/:genre' element={<Genres/>}/>
          <Route path='/courses' element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
