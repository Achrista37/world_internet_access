var data = null;

function chartEarth(yearof) {
d3.json("https://world-internet-access.herokuapp.com/api/dashboard", function(err, rows) {
        data = rows;
        console.log(data)
        console.log(rows);
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
        
        var yearstr = `Internet_Use_Perc_${yearof}` ;
        console.log(yearstr)

      var data = [{
          type: 'choropleth',
          locationmode: 'country codes',
          locations: unpack(rows, 'Abbr'),
          z: unpack(rows, yearstr),
          text: unpack(rows, 'Country'),
          autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(0,191,255)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: false,
                tickprefix: '%',
                title: '% Population of the Country Using Internet'
            }
      }];
      console.log(rows)
      var layout = {
        title: '2019 World Internet Use',
        geo: {
            projection: {
                type: 'orthographic'
            }
        }
      };
  
      Plotly.newPlot("myDiv", data, layout, {showLink: false});
    });
};




//handle selected option
function optionChanged(newVariable) {
    console.log(newVariable);
    chartEarth(newVariable);  
  }
 
  function initannumdropdown() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#select-year");
    var annum = ["2011","2012","2013","2014","2015","2016","2017","2018","2019"]; 
    // dropdownMenu.html("");
      //populate drop down menu
      annum.forEach((name) => {
        dropdownMenu
          .append('option')
        .text(name) // text showed in the menu
        .property("value", name);
        // console.log(name);
      });
      //get the graph to display the first participant's data when the page initially loads
    //   var uponLoadingpage = annum[0];
    //   console.log(uponLoadingpage);
    //   createBarcharts(uponLoadingpage);
    chartEarth(annum[0]);  
  }




initannumdropdown();



/*
d3.json("https://world-internet-access.herokuapp.com/api/dashboard", function(err, rows) {
        console.log(rows);
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
  
      var data = [{
          type: 'choropleth',
          locationmode: 'country codes',
          locations: unpack(rows, 'Abbr'),
          z: unpack(rows, 'Internet_Use_Perc_2019'),
          text: unpack(rows, 'Country'),
          autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(0,191,255)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: false,
                tickprefix: '%',
                title: '% Population of the Country Using Internet'
            }
      }];
  
      var layout = {
        title: '2019 World Internet Use',
        geo: {
            projection: {
                type: 'orthographic'
            }
        }
      };
  
      Plotly.newPlot("myDiv", data, layout, {showLink: false});
    });

/*
function initannumdropdown() {

        var annum = ["2011","2012","2013","2014","2015","2016","2017","2018","2019"]; 
        var select = document.getElementById("select-year");        
        for(var i = 0; i < annum.length; i++) 
        {
            var opt = annum[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    };
    */
//////////////////////////////////////////////////////////////////////////
   


/*
d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then((data) => {
    console.log(data[0]);
});

function createEarth(selectedYear) {
d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then((mydata) => {
    console.log(mydata);
    for(var j = 0; j < mydata.length; j++ ){

    var earthatselectedyearac = d3.select("#myDiv");    
    earthatselectedyearac.html("");

    var internet2011 = mydata[i]["Internet_Use_Perc_2011"];
    var internet2012 = mydata[i]["Internet_Use_Perc_2012"];
    var internet2013 = mydata[i]["Internet_Use_Perc_2013"];
    var internet2014 = mydata[i]["Internet_Use_Perc_2014"];
    var internet2015 = mydata[i]["Internet_Use_Perc_2015"];
    var internet2016 = mydata[i]["Internet_Use_Perc_2016"];
    var internet2017 = mydata[i]["Internet_Use_Perc_2017"];
    var internet2018 = mydata[i]["Internet_Use_Perc_2018"];
    var internet2019 = mydata[i]["Internet_Use_Perc_2019"];
    
    var selectedinternetdata = internet2011;

    if(selectedYear = "2011") {
        selectedinternetdata = internet2011;
    } else if(selectedYear = "2012") {
        selectedinternetdata = internet2012;
    } else if(selectedYear = "2013") {
        selectedinternetdata = internet2013;
    } else if(selectedYear = "2014") {
        selectedinternetdata = internet2014;
    } else if(selectedYear = "2015") {
        selectedinternetdata = internet2015;
    } else if(selectedYear = "2016") {
        selectedinternetdata = internet2016;
    } else if(selectedYear = "2017") {
        selectedinternetdata = internet2017;
    } else if(selectedYear = "2018") {
        selectedinternetdata = internet2018;
    } else if(selectedYear = "2019") {
        selectedinternetdata = internet2019;
    }

    Object.entries(selectedinternetdata).forEach(([key, value]) => {
      earthatselectedyearac.append('ul').text(`${key} : ${value}`)

    });
}}
)
;
}
*/
