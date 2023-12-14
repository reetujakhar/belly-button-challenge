let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//Use D3 to read the JSON file
d3.json(url).then(function(data) {
    console.log(data);
   // const jsonDataString = JSON.stringify(data, null, 2);
    //alert(jsonDataString);
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
    // You can perform additional actions when the select changes
    //alert("Selected value: " + d3.select("#selDataset").node().value);
    updateBarChart(selectedSample);
}

function updateBarChart(selectedSample) {
    // Get the selected sample value from the dropdown
    // const selectedSample = d3.select("#selDataset").node().value;

    // Fetch the data and update the bar chart
    d3.json(url).then(function(data) {
        const selectedData = data.samples.find(sample => sample.id === selectedSample);
        let demographicData = data.metadata.find(item  => item.id === +selectedSample);
        console.log(demographicData);
                
        if(demographicData){
        //Populate Demographic information
                const demographicInfo = d3.select("#sample-metadata");
                // Clear previous content
                
//alert(demographicData.gender);
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
                
        // // Sort the data by sample_values and select the top 10
        // const sortedData = selectedData.sample_values
        //     .map((value, index) => ({ value, id: selectedData.otu_ids[index], label: selectedData.otu_labels[index] }))
        //     .sort((a, b) => b.value - a.value)
        //     .slice(0, 10);



        // // Create a horizontal bar chart
        // const barChart = d3.select("#bar");
        // barChart.html(""); // Clear previous content

        //                 // Set up scales
        //                 const xScale = d3.scaleLinear()
        //                 .domain([0, d3.max(selectedData.sample_values)])
        //                 .range([0, 500]); // Adjust the range as needed

        // barChart.selectAll("div")
        //     .data(sortedData)
        //     .enter()
        //     .append("div")
        //     //.style("width", d => `${d.value}px`)
        //     .style("width", d => `${xScale(selectedData.sample_values[d])}px`)            
        //     //.text(d => `${d.id}: ${d.value}`)
        //     .text(d => `OTU ${d.id}`)
        //     .attr("title", d => d.label)
        //     .style("background-color", "steelblue")
        //     .style("margin", "4px");
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