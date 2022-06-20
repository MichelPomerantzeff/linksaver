import React, { useState } from 'react';
import Main from './components/jsx/Main'
import Header from './components/jsx/Header'
// import SideBar from './components/jsx/SideBar'
import Footer from './components/jsx/Footer'
import Logo from './components/jsx/Logo'
import './App.css';
import RenderSideBar from './components/jsx/RenderSideBar';

export default function App() {

  const [edit, setEdit] = useState([])

  return (
    <div className="app">
      <Logo />
      <Header title='Link Saver App' />
      <RenderSideBar setEdit={setEdit} />
      <Main edit={edit} />
      <Footer />
    </div>
  );
}