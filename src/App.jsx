import { useState } from 'react';
import CardSearch from './components/CardSearch.jsx';
import CardDisplay from './components/CardDisplay.jsx';

import CardContext from './context/CardContext.js';
import './App.css'

function App() {


  return (
    <>
      <h1>Pokemon Card Database</h1>
      <CardSearch/>
      <CardDisplay/>
    </>
  )
}

export default App
