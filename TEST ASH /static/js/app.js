
  
function initdropdown() {

    var dropdown = d3.select("#selDataset"); 

    d3.json('static/js/Internet_data.json', function(data) {
        data.forEach(function (id, index) {
            dropdown.append("option").text(id.Country).property("value", id.Country);
        });
    });
};


initdropdown();

// Call updatePlotly() when a change takes place to the DOM
d3.select("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    //console.log(dataset);


    d3.json('static/js/Internet_data.json', function(data) {

        
        var country = dataset;
        var year2011 =  [];
        var year2012 =  [];
        var year2013 =  [];
        var year2014 =  [];
        var year2015 =  [];
        var year2016 =  [];
        var year2017 =  [];
        var year2018 =  [];
        var year2019 =  [];
        var time = [2011, 2012, 2013,2014,2015,2016,2017,2018,2019]

        data.forEach(function (d) {
            year2011.push(d.Internet_Use_Perc_2011);
            year2012.push(d.Internet_Use_Perc_2012);
            year2013.push(d.Internet_Use_Perc_2013);
            year2014.push(d.Internet_Use_Perc_2014);
            year2015.push(d.Internet_Use_Perc_2015);
            year2016.push(d.Internet_Use_Perc_2016);
            year2017.push(d.Internet_Use_Perc_2017);
            year2018.push(d.Internet_Use_Perc_2018);
            year2019.push(d.Internet_Use_Perc_2019);
        });

        // console.log(country)
        // console.log(year2011)
        // console.log(year2012)
        // console.log(year2013)
        // console.log(year2014)
        // console.log(year2015)
        // console.log(year2016)
        // console.log(time)
        
        var trace2 = {
            x: time,
            y: year2011, year2012, year2013, year2014, year2015, year2016, year2017, year2018, year2019,
            mode: 'lines'
        };
        
        var data = [trace2];
        
        var layout = {
            title:'Increase in Internet Usage over time'
        };
        
        Plotly.newPlot('myDiv', data, layout);
            

    }); 

    d3.json('static/js/Internet_data.json', function(data) {
    
        var country = dataset;
        var year2011 =  [];
        var year2012 =  [];
        var year2013 =  [];
        var year2014 =  [];
        var year2015 =  [];
        var year2016 =  [];
        var year2017 =  [];
        var year2018 =  [];
        var year2019 =  [];
        var time = [2011, 2012, 2013,2014,2015,2016,2017,2018,2019]

        data.forEach(function (d) {
            year2011.push(d.GDP_2011);
            year2012.push(d.GDP_2012);
            year2013.push(d.GDP__2013);
            year2014.push(d.GDP__2014);
            year2015.push(d.GDP__2015);
            year2016.push(d.GDP__2016);
            year2017.push(d.GDP__2017);
            year2018.push(d.GDP__2018);
            year2019.push(d.GDP__2019);
        });


        var trace1 = {
            x: time,
            y: year2011, year2012, year2013, year2014, year2015, year2016, year2017, year2018, year2019,
            mode: 'lines'
        };
        
        var data = [trace1];
        
        var layout = {
            title:'Increase in GDP over time'
        };
        
        Plotly.newPlot('myDiv2', data, layout);
        
    }); 
}; 

// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 500;

// // Define the chart's margins as an object
// var margin = {
//   top: 30,
//   right: 40,
//   bottom: 70,
//   left: 80
// };

// // Define dimensions of the chart area
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Select body, append SVG area to it, and set its dimensions
// var svg = d3.select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append a group area, then set its margins
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // Load data from hours-of-tv-watched.csv
// d3.csv("data.csv").then(function(healthdata) {
//   healthdata.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([8, d3.max(healthdata, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([2, d3.max(healthdata, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup.selectAll("stateCircle")
//     .data(healthdata)
//     .enter()
//     .append("stateCircle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "15")
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "d3-tip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "aText")
//       .text("In Poverty");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("Lacks Healthcare (%)");
//   }).catch(function(error) {
//     console.log(error);
//   });

  


// ///////////////////////


// // d3.json('static/js/Internet_data.json', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     };
//     var allCountryNames = unpack(rows, 'Country'),
//         allYear = unpack(rows, 'year2011','year2012','year2013'),
//         allGdp = unpack(rows, 'year2011','year2012','year2013'),
//         listofCountries = [],
//         currentCountry,
//         currentGdp = [],
//         currentYear = [];

//     for (var i = 0; i < allCountryNames.length; i++ ){
//         if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//             listofCountries.push(allCountryNames[i]);
//         };
//     };

//     function getCountryData(chosenCountry) {
//         currentGdp = [];
//         currentYear = [];
//         for (var i = 0 ; i < allCountryNames.length ; i++){
//             if ( allCountryNames[i] === chosenCountry ) {
//                 currentGdp.push(allGdp[i]);
//                 currentYear.push(allYear[i]);
//             }
//         }
//     };

//     // Default Country Data
//     setBubblePlot('Albania');

//     function setBubblePlot(chosenCountry) {
//         getCountryData(chosenCountry);

//         var trace1 = {
//             x: currentYear,
//             y: currentGdp,
//             mode: 'lines+markers',
//             marker: {
//                 size: 12,
//                 opacity: 0.5
//             }
//         };

//         var data = [trace1];

//         var layout = {
//             title:'Line and Scatter Plot',
//             height: 400,
//             width: 480
//         };

//         Plotly.newPlot('myDiv', data, layout);
//     };

//     var innerContainer = document.querySelector('[data-num="0"'),
//         plotEl = innerContainer.querySelector('.plot'),
//         countrySelector = innerContainer.querySelector('.countrydata');

//     function assignOptions(textArray, selector) {
//         for (var i = 0; i < textArray.length;  i++) {
//             var currentOption = document.createElement('option');
//             currentOption.text = textArray[i];
//             selector.appendChild(currentOption);
//         }
//     }

//     assignOptions(listofCountries, countrySelector);

//     function updateCountry(){
//         setBubblePlot(countrySelector.value);
//     }

//     countrySelector.addEventListener('change', updateCountry, false);
// });
