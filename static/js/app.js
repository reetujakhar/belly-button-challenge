let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//Use D3 to read the JSON file
d3.json(url).then(function(data) {
    console.log(data);
});


function populateDropdown() {
    // Fetch the data
    d3.json(url).then(function(data) {
        // Extract the "names" array from the JSON response
        const namesArray = data.names;

        // Select the dropdown element
        const dropdown = d3.select("#selDataset");

        // Populate the dropdown with sample names
        dropdown.selectAll("option")
            .data(namesArray)
            .enter()
            .append("option")
            .text(d => d);

    updateBarChart(namesArray[0]);
    }).catch(function(error) {
        console.error("Error reading JSON file:", error);
    });
    //updateBarChart();
}

function optionChanged(selectedSample) {
    updateBarChart(selectedSample);
}

function updateBarChart(selectedSample) {
    // Fetch the data and update the bar chart
    d3.json(url).then(function(data) {
        const selectedData = data.samples.find(sample => sample.id === selectedSample);
        let demographicData = data.metadata.find(item  => item.id === +selectedSample);
        console.log(demographicData);
                
        if(demographicData){
        //Populate Demographic information
                const demographicInfo = d3.select("#sample-metadata");
                
                const gender = demographicData.gender;
                const age = demographicData.age;
                const location = demographicData.location;
                const bbtype = demographicData.bbtype;
                const wfreq = demographicData.wfreq;
                const ethnicity = demographicData.ethnicity;

                demographicInfo.html("");
                demographicInfo.append("tr").text(`id: ${selectedSample}`);
                demographicInfo.append("tr").text(`ethnicity: ${ethnicity}`);
                demographicInfo.append("tr").text(`gender: ${gender}`);
                demographicInfo.append("tr").text(`age: ${age}`);
                demographicInfo.append("tr").text(`location: ${location}`);
                demographicInfo.append("tr").text(`bbtype: ${bbtype}`);
                demographicInfo.append("tr").text(`wfreq: ${wfreq}`);
    }
                
        otu_ids= selectedData.otu_ids
        otu_labels= selectedData.otu_labels
        sample_values= selectedData.sample_values

        var barData = [{
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).map(d => `OTU ${d}`).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            orientation: 'h',
            type: 'bar'
          }];
        
          
          var barlayout = {
            title: 'Bar Chart',
          };
          
          Plotly.newPlot('bar', barData, barlayout);

// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

          var bubbleData = [{
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode: 'markers',
            marker: {
              color:otu_ids,
              colorscale:"Earth",
              size:sample_values
            }
          }];
          
          var bubblelayout = {
            title: 'bubbleChart',
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', bubbleData, bubblelayout);
          

    }).catch(function(error) {
        console.error("Error reading JSON file:", error);
    });
}
