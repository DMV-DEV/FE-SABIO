import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import './App.css';
import CardComponent from './components/cards/CardComponent';
import { Outlet } from 'react-router-dom';

 
const App = () => {
  return (
    <>
    <div className="app">
    <Sidebar />
    <div className='main_container'>
      <Header />
      <Outlet/>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default App;