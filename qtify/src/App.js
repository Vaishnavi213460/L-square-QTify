import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import './App.css'; 

function App() {
  return (
    <div>
      <Navbar />
      <Hero /> 
      <Section />
    </div>
  );
}

export default App;