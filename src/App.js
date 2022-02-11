import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawJSONData from './DrawJSONData';
import DrawCSVData from './DrawCSVData';
import WorldMap from './WorldMap';
import DrawContourMap from './DrawContourMap';

function App() {
  return (
    <div className="App">
      <DrawContourMap />
      <DrawJSONData />
      <WorldMap />
      <DrawCSVData />
    </div>
  );
}

export default App;
