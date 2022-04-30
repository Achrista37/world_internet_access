// var globaldata = null;

function chartEarth(yearof) {
    d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then(rows => {
        // globaldata = rows;
        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }

        var yearstr = `Internet_Use_Perc_${yearof}`;
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
            title: `${yearof} World Internet Use`,
            geo: {
                projection: {
                    type: 'hammer'
                }
            }
        };

        Plotly.newPlot("myDiv", data, layout, { showLink: false });
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
    var annum = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"];
    
    //populate drop down menu
    annum.forEach((name) => {
        dropdownMenu
            .append('option')
            .text(name) // text showed in the menu
            .property("value", name);
        // console.log(name);
    });
    //get the graph to display the first participant's data when the page initially loads
    console.log("year");
    // d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then(rowsAC => {
    //     data = rowsAC;
        chartEarth(annum[0]);
    //     console.log(rows);
    //     console.log(data);
    // })
}


initannumdropdown();


