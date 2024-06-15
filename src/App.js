import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import './App.css';

 
const App = () => {
  return (
    <>
    <div className="app">
    <Sidebar />
    <div className='main_container'>
      <Header />
      <div className='body'>
        <h1>Contenido ppal</h1>
      </div>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default App;