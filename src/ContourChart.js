import React, { Component } from 'react';
// import d3-contour from 'd3-contour';
import * as d3 from 'd3';
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { hsv, interpolateHsvLong } from 'd3-hsv'
class ContourChart extends Component {
   constructor(props){
      super(props)
      this.createContourChart = this.createContourChart.bind(this)
   }
   componentDidMount() {
      this.createContourChart()
   }
   componentDidUpdate() {
      this.createContourChart()
   }
   createContourChart() {
   	  console.log(this.props.data.length);
      const node = this.node
      // const dataMax = max(this.props.data)
    //   const yScale = scaleLinear()
    //      .domain([0, dataMax])
    //      .range([0, this.props.size[1]])
	   // select(node)
	   //    .selectAll('rect')
	   //    .data(this.props.data)
	   //    .enter()
	   //    .append('rect')
	   
	   // select(node)
	   //    .selectAll('rect')
	   //    .data(this.props.data)
	   //    .exit()
	   //    .remove()
	   
	   // select(node)
	   //    .selectAll('rect')
	   //    .data(this.props.data)
	   //    .style('fill', '#fe9922')
	   //    .attr('x', (d,i) => i * 25)
	   //    .attr('y', d => this.props.size[1] - yScale(d))
	   //    .attr('height', d => yScale(d))
	   //    .attr('width', 25)

		// d3.json("./assets/output.json", function(error, volcano) {
		//   if (error) throw error;

		var i0 = interpolateHsvLong(hsv(120,1,0.65), hsv(60,1,0.90)),
			i1 = interpolateHsvLong(hsv(60,1,0.90), hsv(0,0,0.95)),
			interpolateTerrain = function(t) {return t<0.5 ? i0(t*2) : i1((t-0.5)*2)},
			color = d3.scaleSequential(interpolateTerrain).domain([220, 350]);

		const width = 360;
		const height = 181;
		if(this.props.data.value) {
		  select(node).selectAll("path")
		    .data(d3.contours()
		        .size([360, 181])
		        .thresholds([240, 260, 280, 300, 320])
		        (this.props.data.value))
		    .enter().append("path")
		        .attr("d", d3.geoPath(d3.geoIdentity().scale(2)))
		        .attr("fill", function(d) { return color(d.value); });
		}
		// });	  


// const path = d3.geoPath();
//   const contours = d3.contours().size([width, height]);

//   const svg = d3.create("svg")
//       .attr("viewBox", wide ? [0, 0, width, height] : [0, 0, height, width])
//       .style("display", "block")
//       .style("margin", "0 -14px")
//       .style("width", "calc(100% + 28px)")
//       .style("height", "auto");

//   const g = svg.append("g")
//       .attr("transform", wide ? null : `
//         rotate(90 ${width/2},${height/2})
//         translate(${(width - height) / 2},${(width - height) / 2})
//       `)
//       .attr("stroke", "white")
//       .attr("stroke-width", 0.03);
  
//   for (const threshold of thresholds) {
//     g.append("path")
//         .attr("d", path(contours.contour(data.values, threshold)))
//         .attr("fill", color(threshold));

//     yield svg.node();
//   }		    
	}
	
	render() {
	      return <svg ref={node => this.node = node}
	      width={720} height={362}>
	      </svg>
	   }
}

export default ContourChart;
