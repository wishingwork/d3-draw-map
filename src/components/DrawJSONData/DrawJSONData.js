import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import ContourChart from './ContourChart'

function DrawJSONData() {

    const [jsonData, setJsonData] = useState([]);
        
    useEffect(() => {
        d3.json("./output.json", function(error, data) {      
            return data;
        }).then(function(data) {
            setJsonData(data)        
        }).catch(function(err) {
            throw err;
        });     
    }, []);

    return ( 
         <div className = "App" >
          <ContourChart data={jsonData} size={[500,500]} />
         </div>
    );
    
}

export default DrawJSONData;