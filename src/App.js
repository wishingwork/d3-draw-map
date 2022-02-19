import React from 'react';
import './App.css';
import DrawJSONData from './components/DrawJSONData';
import DrawCSVData from './components/DrawCSVData';
import WorldMap from './components/WorldMap';
import DrawContourMap from './components/DrawContourMap';

function App() {
  const Comps = [
    { components: DrawContourMap, title: 'Contour & Shading on Google Map'}, 
    { components: DrawJSONData, title: 'Json Data on D3'}, 
    { components: WorldMap, title: 'D3 Map'}, 
    { components: DrawCSVData, title: 'CSV Data in D3'}, 
  ];

  return (
    <div className="App bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">    
          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {Comps.map((Comp, index) => {
              return (
                <div className="group relative" key={index}>
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                   <Comp.components className="w-full h-full object-center object-cover"/>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{Comp.title}</p>
                </div>                
              )
            })}
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
