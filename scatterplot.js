let cities;

//loads in the data
d3.csv('cities.csv').then(data => {
    cities = data;
    console.log('cities', data);
});

d3.csv('cities.csv', d => {
    //sets the numerical variable values manually
    return {
        ...d, 
        eu: d.eu=='true', 
        population: +d.population, 
        x: +d.x, 
        y: +d.y, 
    }

}).then(data => {
    cities = data; 
    console.log("cities", data);

    //filters the dataset for european cities
    cities = data.filter(d=> d.eu);
    console.log("filtered", cities);

    d3.select('.city-count').text("Number of cities: 28");

    //creates an svg element
    const width = 700; 
    const height = 550; 
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    
    //draws the circles for each country
    svg.selectAll('circle')
        .data(cities)
        .enter()
        .append('circle')
        .style('fill', d3.color('steelblue'))
        .attr('cx', d=> d.x)
        .attr('cy', d=> d.y)
        .attr('r', function(d) {
            if(d.population > 1000000) {
                return 8;
            } else {
                return 4;
            }
        })
        .attr('fill', 'black');

    //sets the country labels for the circles
    svg.selectAll('text')
        .data(cities)
        .enter()
        .append('text')
        .text(d => d.city)
        .attr('x', d=> d.x-15)
        .attr('y', d=> d.y+20)
        .attr('opacity', function(d) {
            if(d.population > 1000000) {
                return 100; 
            } else {
                return 0;
            }
        })
        .attr('font-size', function(d) {
            return 16;
        })
});