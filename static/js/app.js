    d3.json("internet_with_countrycodes.json", function(err, rows) {
        console.log(rows);
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
  
      var data = [{
          type: 'choropleth',
          locationmode: 'country codes',
          locations: unpack(rows, 'Country_Code'),
          z: unpack(rows, '2019_Internet_Use_Perc'),
          text: unpack(rows, 'Country_Name'),
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


