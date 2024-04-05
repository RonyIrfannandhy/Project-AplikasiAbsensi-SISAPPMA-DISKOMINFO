import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components1/Navbar';
import { Footer } from './components1';

const LayoutWithNavbar = () => {
  return (
    <div>
      <Navbar />
      
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithNavbar;
