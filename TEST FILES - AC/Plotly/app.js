//build a function to utilize d3 to grab json file and put data into variables
//filtering those data based on ID selected in drop down menu then ultimately create charts based on those data

function createBarcharts(idSelector) {
  d3.json("samples.json").then((data) => {
// Grab values from the data json object , get promise and build the plots
    var metadata = data.metadata;
    var bb_data = data;
    var sample_data = data.samples;
    console.log(idSelector);
    
    //filter our data per the ID selected in the drop down menu 
    var filteredData = sample_data.filter(row => row.id == idSelector);
    console.log(filteredData);
    var OTUIDs = filteredData[0].otu_ids;
    console.log(OTUIDs);
    var SampleValues = filteredData[0].sample_values;
  
    /* CONSOLE LOGS TO CHECK VARIABLES
    console.log(bb_data);
    console.log(metadata);
    console.log(sample_data);
    console.log(id940);
    console.log(sample_data.length);
 */

 // build layout for the graph
    var layout = {
      title: `TOP 10 OTU FOUND IN TEST SUBJECT ${filteredData[0].id}`,
      xaxis: { title: "Values" },
      yaxis: { title: "Organism" }
    };

  //build data component for the graph
    console.log(filteredData.sample_values);
    var data = [{
      type: 'bar',
      // get the values of colonies of the top 10 OTU colonizing the individual
      x: SampleValues.slice(0, 10).reverse(),
      // get the ID of the top 10 OTU colonizing the individual
      y: OTUIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      // hotizontal bar chart setting
      orientation: 'h',
      // hover text displays OTU labels
      hovertemplate : filteredData[0].otu_labels.slice(0, 10).reverse()
    
    }];
    // execute Plotly to chart in the bar section of our html with above data and layout
    Plotly.newPlot('bar', data, layout)
    //call bubbleCharts function from below to display corresponding bubblechart
    bubbleCharts(filteredData);
    //call demographicInfo from below to display corresponding box with demographic info
    demographicInfo(idSelector)
  })
  
}

// function to populate drop down menu and event handler for when an option from the dropdown is selected
function dropdownEventhandler() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  d3.json("samples.json").then((data) => { 
    var participant_names = data.names;
    console.log(participant_names);
    //populate drop down menu
    participant_names.forEach((name) => {
      dropdownMenu
    	.append('option')
      .text(name) // text showed in the menu
      .property("value", name);
      console.log(name);
    });
    //get the graph to display the first participant's data when the page initially loads
    var uponLoadingpage = participant_names[0];
    console.log(uponLoadingpage);
    createBarcharts(uponLoadingpage);
  });
}
//handle selected option
function optionChanged(newVariable) {
  console.log(newVariable);
  createBarcharts(newVariable);


}

//call the event handler function
dropdownEventhandler();

//create a function to create bubble charts, per selected dropdown option

function bubbleCharts(morebbdata) {
// set the dimensions and margins of the graph
  var trace1 = {
      x: morebbdata[0].otu_ids,
      y: morebbdata[0].sample_values,
      text: morebbdata[0].otu_labels,
    mode: 'markers',
    marker: {
      size: morebbdata[0].sample_values,
      color: morebbdata[0].otu_ids
     
    }
  };

  var data = [trace1];

  var layout = {
    title: `OTU ID VS SAMPLE VALUE IN TEST SUBJECT ${morebbdata[0].id}`,
    xaxis: { title: "OTU ID" },
    yaxis: { title: "SAMPLE VALUES" },
    showlegend: false,
    height: 700,
    width: 1000
  };

  Plotly.newPlot('bubble', data, layout);
}

// create a function to display participant's demographic info in a box
function demographicInfo(studyParticipant) {
  var sample_metadata = d3.select("#sample-metadata");
  d3.json("samples.json").then((data) => { 
    var participant_metadata = data.metadata;
    console.log(participant_metadata);
    //get the graph to display the first participant's data when the page initially loads
    var filteredMetadata = participant_metadata.filter(row => row.id == studyParticipant);
    //var uponLoadingpage = participant_nam[0];
    console.log(filteredMetadata);
    sample_metadata.html("");
    console.log(filteredMetadata[0]);
    Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
      sample_metadata.append('ul').text(`${key} : ${value}`)
    });
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

       var data = [{
            type: 'choropleth',
            locations: unpack(rows, 'CODE'),
            z: unpack(rows, 'GDP (BILLIONS)'),
            text: unpack(rows, 'COUNTRY'),
            colorscale: [
                [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
            autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: false,
                tickprefix: '$',
                title: 'GDP<br>Billions US$'
            }
      }];

      var layout = {
          title: '2014 Global GDP<br>Source: <a href="https://www.cia.gov/library/publications/the-world-factbook/fields/2195.html"> CIA World Factbook</a>',
          geo:{
              showframe: false,
              showcoastlines: false,
              projection:{
                  type: 'mercator'
              }
          }
      };
      Plotly.newPlot("myDiv", data, layout, {showLink: false});
});





