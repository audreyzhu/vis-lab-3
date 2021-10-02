let buildings;

//loads in the data
d3.csv('buildings.csv').then(data => {
    buildings = data;
    console.log('buildings', data);
})

d3.csv('buildings.csv', d => {
    //sets the numerical variable values manually
    return {
        ...d, 
        completed: +d.completed, 
        floors: +d.floors, 
        heightft: +d.height_ft, 
        heightm: +d.height_m, 
        heightpx: +d.height_px, 
    }

}).then(data => {
    buildings = data;
    console.log('buildings', data);

    d3.select('.building-name').text("Details");

    //sorts the data by building height
    const sortedlist = data.sort(function(a, b) {
        return b.heightm - a.heightm; 
    })
    console.log("Sorted:", sortedlist);

    //creates an  svg element
    const width = 500; 
    const height = 500;
    const svg = d3.select('.building-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    //draws the bars for each building
    svg.selectAll('rect')
        .data(sortedlist)
        .enter()
        .append('rect')
        .attr('x', 200)
        .attr('y', function(d, i) {
            return i*45;
        })
        .attr('width', d => d.heightpx)
        .attr('height', 40)
        .attr('fill', 'green')
        //resets the details column after each click
        .on('click', (event, d) => {
            console.log("clicked", d);
            d3.select('.image')
                .attr('src', d.image);
            d3.select('.height')
                .text(d.heightft + " ft");
            d3.select('.city')
                .text(d.city);
            d3.select('.country')
                .text(d.country);
            d3.select('.floors')
                .text(d.floors)
            d3.select('.completed')
                .text(d.completed);
        })
    
    //sets the name labels for each bar/building
    svg.selectAll('text')
        .data(sortedlist)
        .enter()
        .append('text')
        .text(d => d.building)
        .attr('x', 50)
        .attr('y', function(d, i) {
            return 20 + i*46.5;
        })
        .attr('font-size', function(d) {
            return 10;
        });

    //sets the height labels for each bar/building
    svg.selectAll('text.height-label')
        .data(sortedlist)
        .enter()
        .append('text')
        .text(d => d.heightft + " ft")
        .attr('x', function(d, i) {
            return 190 + d.heightpx;
        })
        .attr('y', function(d, i) {
            return 20 + i*46.5;
        })
        .attr('font-size', function(d) {
            return 10;
        })
        .attr('text-anchor', 'end')
        .attr('fill', 'white');
})