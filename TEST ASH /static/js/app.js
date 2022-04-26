d3.json('static/js/internet_with_countrycodes.json', function(internet) {
    
    var original_data = internet[0]

    for (var key in p) {
        if (p.hasOwnProperty(key)) {
            console.log(key + " -> " + p[key]);
        }
    }
    
});


  
  






// d3.json('static/js/internet_with_countrycodes.json', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     };
    
//     d3.json('static/js/internet_with_countrycodes.json', function(data) {
//         for (var i = 0; i < data.length; i++) {
//             console.log(data[i].Country_Name);
//             console.log(data[i].Age);
//     };

//     function edit_json(){
        

//         for(var i = 0; i < dataset.length; i++) {
//             var obj = dataset[i];
        
//             console.log(obj.id);
//         };

//     };

//     var allCountryNames = unpack(rows, 'Country_Name'),
//         allYear = unpack(rows, '2011_Internet_Use_Perc', '2012_Internet_Use_Perc'),
//         allGdp = unpack(rows, '2011_GDP'),
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
//     edit_json()
// });
