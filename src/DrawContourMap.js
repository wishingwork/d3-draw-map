import React, { Component } from 'react';
// import ContourChart from './ContourChart';
import * as d3 from 'd3';
// import GoogleMapReact from 'google-map-react';
// import MyGreatPlace from './my_great_place.jsx';

import { select } from 'd3-selection';
import { contours } from 'd3-contour';
import { hsv, interpolateHsvLong } from 'd3-hsv';
import { geoMercator, geoPath } from 'd3-geo'
import GoogleMap from './GoogleMap';

class DrawContourMap extends Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
      this.createContourChart = this.createContourChart.bind(this);
    }

    getTemp() {
      let self = this;
      d3.json("./output.json", (d) => {
          return d
      }).then((data) => {
            self.setState({ data: data });
      });
    }

    componentWillMount() {
        this.getTemp();
        // this.createContourChart()
    }
    componentDidMount() {
       // this.createContourChart()
    }
    componentDidUpdate() {
       // this.createContourChart()
    }
    handleApiLoaded(map, maps)
    {
      var marker = maps.Marker({
          position: {
            lat: 59.955413, lng: 131.044}}
          );
      marker.setMap(map);
    }


     createContourChart(layer, overlayProjection) {
        const node = this.node
        const volcano = this.state.data
        layer.select('svg').remove();

        var svg = layer.append("svg")
  							   .attr('id', "container")
  							   .attr('width', 600)
  							   .attr('height', 600)

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

        if(this.state.data.value) {
            svg
             .selectAll("path")
             .data(contours()
                .size([360, 181])
                .thresholds([240, 260, 280, 300, 320])
                 (volcano.value).map(convert))
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

					var shared = {};

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

    render () {
        console.log(this.props);
        return (
            <GoogleMap
                id="myMap"
                options={{
                  center: { lat: 50, lng: 0 },
                  zoom: 6
                }}
                onMapLoad={map => {
                      let self = this;
                      var overlay = new window.google.maps.OverlayView();
                      overlay.onAdd = function() {
                    			var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("id", "cc")
                    			overlay.draw = function() {
                              let overlayProjection = this.getProjection();
                              document.getElementById('cc').style.left = '-250px';
                              document.getElementById('cc').style.top = '-250px';
                              document.getElementById('cc').style.position = 'relative';
                              self.createContourChart(layer, overlayProjection);
                          }
                      }
                  		overlay.setMap(map);
                }}
              />
        );
    }
};

export default DrawContourMap;
