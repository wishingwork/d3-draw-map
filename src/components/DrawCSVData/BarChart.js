import React, { useRef } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import '../../App.css'

function BarChart(props) {
	const chart = useRef();

   const node = chart.current;
   const dataMax = max(props.data);
   const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, props.size[1]]);

   select(node)
      .selectAll('rect')
      .data(props.data)
      .enter()
      .append('rect');
   
   select(node)
      .selectAll('rect')
      .data(props.data)
      .exit()
      .remove();
   
   select(node)
      .selectAll('rect')
      .data(props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
		
   return (
   	<svg ref={chart} width={500} height={500} />
	)
}
export default BarChart;
