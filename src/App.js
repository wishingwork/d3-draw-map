import React from 'react';
import './App.css';
import DrawJSONData from './components/DrawJSONData';
import DrawCSVData from './components/DrawCSVData';
import WorldMap from './components/WorldMap';
import DrawContourMap from './components/DrawContourMap';

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
