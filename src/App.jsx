import { useState } from 'react';
import CardSearch from './components/CardSearch.jsx';
import CardDisplay from './components/CardDisplay.jsx';
import Header from './components/Header.jsx';

import CardContext from './context/CardContext.js';


import './App.css'

function App() {


  return (
    <>
      <Header />
      <CardSearch/>
      {/* <CardDisplay/> */}
    </>
  )
}

export default App
