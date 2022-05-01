// @TODO: YOUR CODE HERE!
var svgWidth = 1500;
var svgHeight = 900;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "population_2011";
var chosenxAxis = "GDP_2011";

// function used for updating x-scale var upon click on axis label
function xScale(peopleData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(peopleData, d => d[chosenXAxis]),
      d3.max(peopleData, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "GDP") {
    var label = "GDP:";
  }
  else {
    var label = "Population: ";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([100, -10])
    //.offset([0,5])
    .html(function(d) {
      return (`${d.Country}<br>Internet_Usage_Perc_2011: ${parseFloat(d.Internet_Use_Perc_2011).toFixed(1)}%<br>${label} ${d[chosenXAxis]}`);
    });


  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(dataTip, index) {
      toolTip.hide(dataTip);
    });

  return circlesGroup;
}

// Read CSV
  d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then(function(data) {
    //Test data connection
    console.log(data);
//year string
//dropdown select
//var yearstr = [`Internet_Use_Perc_${yearof}`, `population_${yearof}`,`GDP_${yearof}`];
//console.log(yearstr)

    // parse data
    data.forEach(function(data) {
        data.Internet = +data.Internet_Use_Perc_2011/100;
        data.GDP = +data.GDP_2011;
        data.population = +data.population_2011;
        data.abbr = data.Abbr;
    })
  

    // xLinearScale function above csv import
    var xLinearScale = xScale(data, chosenXAxis);
  
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Internet)])
        .range([height, 0]);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
    // append y axis
    chartGroup.append("g")
        .call(leftAxis
          .ticks(15)
          .tickFormat(d3.format(",.2%")));
  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.Internet))
        .attr("r", 12)
        .attr("fill", "blue")
        .attr("opacity", ".5");
    //append abbreviations    
  
    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var incomeLengthLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "population") // value to grab for event listener
        .classed("active", true)
        .text("Population");
  
    var GDPLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "GDP") // value to grab for event listener
        .classed("inactive", true)
        .text("Gross Domestic Product");
  
    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("active", true)
        .classed("axis-text", true)
        .text("Internet Usage");
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  
    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
            // replaces chosenXAxis with value
            chosenXAxis = value;
  
            // updates x scale for new data
            xLinearScale = xScale(data, chosenXAxis);
  
            // updates x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);
  
            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
  
            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
            // changes classes to change bold text
            if (chosenXAxis === "GDP") {
            GDPLabel
                .classed("active", true)
                .classed("inactive", false);
            incomeLengthLabel
                .classed("active", false)
                .classed("inactive", true);
            }
            else {
            GDPLabel
                .classed("active", false)
                .classed("inactive", true);
            incomeLengthLabel
                .classed("active", true)
                .classed("inactive", false);
            }
        }
        });
    });

 


  
  
  