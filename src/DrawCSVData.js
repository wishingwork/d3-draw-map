import React, {Component} from 'react';

import * as d3 from 'd3';

import data from './assets/01001099999.csv';
import BarChart from './BarChart'

class DrawCSVData extends Component {

constructor(props) {
    super(props)
    this.state = {
      data: []
    }
}

componentDidMount() {
    let self = this;
    
    d3.csv(data, function(d) {
        return +d.TEMP
    }).then(function(data) {
        self.setState({data: data})        
    }).catch(function(err) {
        throw err;
    })
}

render() {
    // console.log(this.state.data)

    return ( 
             <div className = "App" >
              <div> Data Visualization </div> 
              <BarChart data={this.state.data} size={[500,500]} />
             </div>
        );
    }
}

export default DrawCSVData;