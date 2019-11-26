import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
    constructor() {
        super();

        this.width = 700;
        this.height = 500;
        this.margin =  { top:10, left:50, bottom: 40, right: 10 };
        this.state = {
            x: undefined,
            y: undefined,
            iwidth: this.width - this.margin.left - this.margin.right,
            iheight: this.height - this.margin.top - this.margin.bottom,
            data : [
                { name: "Medellín", w2005: 3, w2006: 33 },
                { name: "Cali", w2005: 39, w2006: 45 },
                { name: "Bogotá", w2005: 7, w2006: 31 },
                { name: "Pereira", w2005: 35, w2006: 36 },
                { name: "Bucaramanga", w2005: 16, w2006: 23 },
                { name: "Cúcuta", w2005: 45, w2006: 45 },
                { name: "Armenia", w2005: 6, w2006: 16 }
            ]
        };

        this.change = this.change.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.drawChart(this.state.data)
    }

    drawChart(data) {
        const canvas = d3.select(this.refs.canvas)
        
        const svg = canvas.append("svg");
        svg.attr("width", this.width);
        svg.attr("height", this.height);
        
        let g = svg.append("g").attr("transform", `translate(${this.margin.left},${this.margin.top})`);
        
        const y = d3.scaleLinear() 
            .domain([0, 50])
            .range([this.state.iheight, 0]);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name) ) 
            .range([0, this.state.iwidth])
            .padding(0.1); 

        const bars = g.selectAll("rect").data(data);
        
        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "green")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.w2005))
            .attr("height", d => this.state.iheight - y(d.w2005))
            .attr("width", x.bandwidth()); 

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${this.state.iheight})`);  

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
            
        this.setState({ x: x, y: y });

    }

    change() {
        const { data, y } = this.state;
        
        d3.selectAll("rect").data(data)
            .transition()
            .attr("y", d => y(d.w2006))
            .attr("height", d => this.state.iheight - y(d.w2006))
            .style("fill", "steelblue")
            .duration(800);
    }
    
    reset() {
        console.log("RESET");
        const { data, y } = this.state;
        
        d3.selectAll("rect").data(data)
            .transition()
            .attr("y", d => y(d.w2005))
            .attr("height", d => this.state.iheight - y(d.w2005))
            .style("fill", "green")
            .duration(800);
    }

    render() { 
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Gráfico de barras animado</h1>
                <div ref="canvas"></div>
                <div>
                    <button type="button" className="btn btn-success m-1" id="start" onClick={this.reset}>2005</button>
                    <button type="button" className="btn btn-primary m-1" id="reset" onClick={this.change}>2006</button>
                </div>
            </div>
        );
    }
}
 
export default BarChart;