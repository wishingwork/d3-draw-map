import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { contours } from 'd3-contour';
import { hsv, interpolateHsvLong } from 'd3-hsv';

import GoogleMap from './GoogleMap';

function DrawContourMap() {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
      d3.json("./output.json", (d) => {
          return d;
      }).then((data) => {
          setJsonData(data);
      });      
    }, []);

   function createContourChart(layer, overlayProjection) {
      const volcano = jsonData;
      layer.select('svg').remove();

      var svg = layer.append("svg")
							   .attr('id', "container")
							   .attr('width', 600)
							   .attr('height', 600);

      var project = d3.geoTransform({
                    point: function(x, y) {
    						          let d = new window.google.maps.LatLng(y, x);
    						          d = overlayProjection.fromLatLngToDivPixel(d);
    						          return this.stream.point(d.x+250, d.y+250);
      						   }
    					    });
      var path = d3.geoPath().projection(project);

      var i0 = interpolateHsvLong(hsv(120, 1, 0.65), hsv(60, 1, 0.90)),
          i1 = interpolateHsvLong(hsv(60, 1, 0.90), hsv(0, 0, 0.95)),
          interpolateTerrain = function(t) { return t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2); },
          color = d3.scaleSequential(interpolateTerrain).domain([ -0.1, 0.3]);

      if(jsonData.value) {
          svg
           .selectAll("path")
           .data(
            contours()
              .size([360, 181])
              .thresholds([240, 260, 280, 300, 320])(volcano.value).map(convert)
              )
           .enter().append("path")
             .attr("d", path)
             .style("stroke-width", 1)
             .style("stroke", "red")
             .attr("fill", function(d) { return color(d.value); })
             .style("opacity", 0.5);
      }

      function convert(d) {
        var contour2Lng = d3.scaleLinear()
									.domain([1,360])
									.range([1, 360]);
        var contour2Lat = d3.scaleLinear()
        					.domain([1,181])
        					.range([90, -90]);

				var p = {
				  type: "Polygon",
				  coordinates: d3.merge(d.coordinates.map(function(polygon) {
					return polygon.map(function(ring) {
					  return ring.map(function(point) {
  							return [
  							  contour2Lng(point[0]),
  							  contour2Lat(point[1])
  							];
						  }).reverse();
						});
				  }))
				};

				p.value = d.value;
				return p;
			}
   }

  function loadMap(map) {
    var overlay = new window.google.maps.OverlayView();
    overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("id", "cc")
        overlay.draw = () => {
            let overlayProjection = this.getProjection();
            document.getElementById('cc').style.left = '-250px';
            document.getElementById('cc').style.top = '-250px';
            document.getElementById('cc').style.position = 'relative';
            createContourChart(layer, overlayProjection);
        }
    }
    overlay.setMap(map);
  }

  return (
      <GoogleMap
          id="myMap"
          options={{
            center: { lat: 50, lng: 0 },
            zoom: 6
          }}
          onMapLoad={loadMap}
        />
  );
    
};

export default DrawContourMap;
