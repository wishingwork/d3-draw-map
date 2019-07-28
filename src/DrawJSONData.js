import React, {Component} from 'react';

// import './App.css';

import * as d3 from 'd3';

// import data from './assets/01001099999.csv';
import ContourChart from './ContourChart'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: []
        }
    }

    componentDidMount() {
        let self = this;
        
        // d3.csv(data, function(d) {
        d3.json("./output.json", function(error, data) {      
            // return +d.TEMP
            console.log(data);
            return data;
        }).then(function(data) {
            self.setState({data: data})        
        }).catch(function(err) {
            throw err;
        })
    }

    render() {
        console.log(this.state.data)

        return ( 
             <div className = "App" >
              <div> Data Visualization </div> 
              <ContourChart data={this.state.data} size={[500,500]} />
             </div>
        );
    }
}

export default App;