import React from 'react' ;
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
    <Navbar />
    <div className="container">
       <Outlet />
    </div>
    {/* <Footer /> */}
    </>
  )
}
