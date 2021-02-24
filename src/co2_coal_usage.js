import coalAQI from '../static/coal_consumption_air_quality.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var no2Array = [];   // used to store data later

const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    //   loader: vega.loader({
    //     baseURL: "",
    //   }),
    renderer: "canvas",
  },
};

vl.register(vega, vegaLite, options);

// Again, We use d3.csv() to process data
d3.csv(coalAQI).then(function(data) {
  data.forEach(function(d){
    no2Array.push(d);
  })
  drawPointsVegaLite();
});


function drawPointsVegaLite() {
  // your visualization goes here
  vl.markPoint({color:'black'})
  .data(no2Array)
  .encode(
      vl.x().fieldQ('Days NO2'),
      vl.y().fieldQ('MMBTU'),
      vl.tooltip(['County', 'State']),
  )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('air_coal_usage').appendChild(viewElement);
  });
}
  
