import React, { Component } from 'react'
import './App.css'
import worlddata from './world'
import { geoMercator, geoPath } from 'd3-geo'
import * as d3 from 'd3';

class WorldMap extends Component {
   render() {
      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection)      
      // const pathGenerator = d3.geoPath(d3.geoIdentity().scale(2))
      const countries = worlddata.features
         .map((d,i) => <path
         key={'path' + i}
         d={pathGenerator(d)}
         className='countries'
         />)
   return <svg width={500} height={500}>
   {countries}
   </svg>
   }
}
export default WorldMap