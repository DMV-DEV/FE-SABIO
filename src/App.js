import React from 'react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import './App.css';
import CardComponent from './components/cards/CardComponent';

 
const App = () => {
  return (
    <>
    <div className="app">
    <Sidebar />
    <div className='main_container'>
      <Header />
      <div className='body'>
        <h1>My classes</h1>
        <div className='body__cards'>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        </div>
      </div>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default App;