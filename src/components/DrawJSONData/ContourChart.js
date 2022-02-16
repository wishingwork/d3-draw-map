import React, { useRef } from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection'
import { hsv, interpolateHsvLong } from 'd3-hsv'

function ContourChart(props) {
	const chart = useRef();

   const node = chart.current;
	var i0 = interpolateHsvLong(hsv(120,1,0.65), hsv(60,1,0.90)),
		i1 = interpolateHsvLong(hsv(60,1,0.90), hsv(0,0,0.95)),
		interpolateTerrain = function(t) {return t<0.5 ? i0(t*2) : i1((t-0.5)*2)},
		color = d3.scaleSequential(interpolateTerrain).domain([220, 350]);

	if(props.data.value) {
	  select(node).selectAll("path")
	    .data(d3.contours()
	        .size([360, 181])
	        .thresholds([240, 260, 280, 300, 320])(props.data.value))
	    .enter().append("path")
	        .attr("d", d3.geoPath(d3.geoIdentity().scale(2)))
	        .attr("fill", function(d) { return color(d.value); });
	}    	
	
   return <svg ref={chart} width={720} height={362}/>
	      
}

export default ContourChart;
