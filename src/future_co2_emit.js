import futureCo2EmitData from '../static/world_co2_ssp_cmip6.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var co2EmitArray = [];   // used to store data later

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
d3.csv(futureCo2EmitData).then(function(data) {
  data.forEach(function(d){
    co2EmitArray.push(d);
  })
  drawLineVegaLite();
});


function drawLineVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markLine({color:'green'})
  .data(co2EmitArray)
  .encode(
      vl.x().fieldT('Year'),
      vl.y().fieldQ('SSP5-85'),
      vl.tooltip(['Year','SSP5-85']),
  )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('future_co2').appendChild(viewElement);
  });
}
  
