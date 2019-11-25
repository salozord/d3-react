const svg = d3.select("#canvas").append("svg")
    .attr("width", 400)
    .attr("height", 200)
    .style("border-color", "black")
    .style("border-style", "solid")
    .style("border-width", "1px");

const circle = svg.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 10);

d3.select("#start").on("click", function () {
    circle
        .transition()
        .attr("cx", 120)
        .attr("cy", 120)
        .attr("r", 20)
        .attr("opacity",0.8)
        .style("fill", "#D63230")
        .delay(500)
        .duration(5000)
        .ease(d3.easeBounce)
        .on("end",function() { 
		    d3.select(this)
		    	.transition() 
                .attr("r", 25) 
                .attr("cx", 75) 
                .attr("cy", 75) 
                .attr("opacity", 0.6) 
                .attr("fill", "blue") 
                .delay(500)  
                .duration(2500) 
                .ease(d3.easeBounce); 
    });
});
    
d3.select("#reset").on("click", function () {
    circle
    .transition()
    .attr("r", 10)
    .attr("cx", 50)
    .attr("cy", 50)
    .style("fill", "#000000")
    .attr("opacity", 1);
});