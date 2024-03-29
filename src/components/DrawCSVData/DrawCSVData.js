import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import data from '../../assets/01001099999.csv';
import BarChart from './BarChart'

function DrawCSVData() {
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        d3.csv(data, function(d) {
            return +d.TEMP
        }).then(function(processedData) {
            setCsvData(processedData)
        }).catch(function(err) {
            throw err;
        })
    }, []);

    return ( 
         <div className = "App" >
          <BarChart data={csvData} size={[500,500]} />
         </div>
    );
}

export default DrawCSVData;