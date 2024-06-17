import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import { Outlet } from 'react-router-dom';

 
const App = () => {
  return (
    <>
    <div className="app">
    <Sidebar />
    <div className='main_container'>
      <Header />
      <Outlet/>
    </div>
    </div>
    </>
  );
};

export default App;