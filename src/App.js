import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawJSONData from './DrawJSONData';
import DrawCSVData from './DrawCSVData';
import WorldMap from './WorldMap';
function App() {
  return (
    <div className="App">
      <DrawJSONData />
      <WorldMap />
      <DrawCSVData />
    </div>
  );
}

export default App;
