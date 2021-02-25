import coalData from '../static/coal_consumption_air_quality.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var coalArray = [];   // used to store data later

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
d3.csv(coalData).then(function(data) {
  data.forEach(function(d){
    coalArray.push(d);
  })
  drawLineVegaLite();
});

function drawLineVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markPoint({color:'black'})
  .data(coalArray)
  .encode(
      vl.x().fieldQ('Days PM25'),
      vl.y().fieldQ('MMBTU'),
      vl.tooltip(['County', 'State']),
    )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('pm25').appendChild(viewElement);
  });
}
  
