

function chartEarth(yearof) {
    d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then(rows => {
        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        };

        var yearstr = `Internet_Use_Perc_${yearof}`;
        console.log(yearstr)

////////////INTERNET MAP
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
                tickprefix: '',
                title: 'Internet usage (%)'
           
            }
        }];
        console.log(rows)
        var layout = {
            title: `${yearof} World Internet Use`,
            font: {
                family: 'Courier New, monospace',
                size: 16
            
            },
            autosize: false,
            width: 580,
            paper_bgcolor:'rgb(255, 229, 249)',
            plot_bgcolor:'rgb(245, 245, 252)',
            height: 550,
            margin: {
                l: 20,
                r: 30,
                b: 5,
                t: 30,
                pad: 2
              },
            geo: {
                projection: {
                    type: 'hammer'
                }
            }
        };

        
        Plotly.newPlot("myDiv", data, layout, { showLink: false });

////////////////// BAR CHART 

        var income = unpack(rows, 'IncomeGroup')
        // console.log(income)
        newincome = []
        for (i = 0; i < income.length; i++) {

            if (income[i] == "High income") {
                newincome.push('rgb(175, 175, 218,1');
            }
            else if (income[i] == 'Upper middle income') {
                newincome.push('rgb(141, 205, 209,1)');
            }
            else if (income[i] == 'Lower middle income') {
                newincome.push('rgb(214, 161, 202,1');
            }
            else if (income[i] == 'Low income') {
                newincome.push('rgb(233, 175, 142,1');
            }
        }
        var trace1 = {
            x: unpack(rows, 'Country'),
            y: unpack(rows, yearstr),
            type: 'bar',
            marker: {
                color: newincome,
            }
          };
          
        var data2 = [trace1];

        var layout2 = {

            title: `${yearof} World Internet Use by Income Group`,
            font: {
                family: 'Courier New, monospace',
                size: 12
            
            },
            width:1370,
            autosize: true,
            showlegend:'true',
            height: 400,
            barmode: 'relative',
            paper_bgcolor:'rgb(255, 227, 211)',
            plot_bgcolor:'rgb(255, 227, 211)',
            xaxis: {
                title: 'Country',
                font: {
                  family: 'Courier New, monospace',
                  size: 12,
                  color: 'black'
                },
                tickmode: 'array',
                
                ticks: 'outside',
                tickangle: 90,
                tickcolor: '#000',
                textfont_size:8, 
                tickvals:unpack(rows, 'Country'),
                ticktext:unpack(rows, 'Country'),
              },
              yaxis:{
                  range:[0,100],
                  title: '(%) Population using the Internet',
                  font: {
                      family: 'Courier New, monospace',
                      size: 12,
                      color: 'black'
                },

              }

            };
          
        Plotly.newPlot('barchart', data2, layout2);
          
    });
};
///////GDP MAP 
function chartEarth2(yearof2) {
    d3.json("https://world-internet-access.herokuapp.com/api/dashboard").then(rows => {
        function unpack(rows, key) {
            return rows.map(function (row) { return row[key]; });
        }

        var yearstr2 = `GDP_${yearof2}`;

        var datas = [{
            type: 'choropleth',
            locationmode: 'country codes',
            locations: unpack(rows, 'Abbr'),
            z: unpack(rows, yearstr2),
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
                tickprefix: '',
                title: 'GDP Growth %'
            }
        }];
        console.log(rows)
        var layouts = {
            
            autosize: false,
            width: 580,
            paper_bgcolor:'rgb(225, 254, 250)',
            plot_bgcolor:'rgb(225, 254, 250)',
            height: 550,
            title: `${yearof2} World GDP Growth`,
            font: {
                family: 'Courier New, monospace',
                size: 16
            
            },
            margin: {
                l: 20,
                r: 30,
                b: 5,
                t: 30,
                pad: 2
              },
            geo: {
                projection: {
                    type: 'hammer'
                }
            }
        };
        
        Plotly.newPlot("GDP", datas, layouts, { showLink: false });
    });
};

//handle selected option
function optionChanged(newVariable) {
    console.log(newVariable);
    chartEarth(newVariable)
    chartEarth2(newVariable)
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
        chartEarth2(annum[0]);
    //     console.log(rows);
    //     console.log(data);
    // })
}


initannumdropdown();



