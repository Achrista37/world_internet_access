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


    function initdropdown() {

        var annum = ["2011","2012","2013","2014","2015","2016","2017","2018","2019"]; 
        var select = document.getElementById("selectYear");        
        for(var i = 0; i < annum.length; i++) 
        {
            var opt = annum[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    };
    
    
    initdropdown();
    