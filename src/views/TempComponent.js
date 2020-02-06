import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap';
import Sketch from "react-p5";

/* this is the sandbox component for users -- this is a temporary test case to show how it works */

class TempComponent extends Component {
	datapoints = [{x: 1, y:90},{x: 2, y:90},{x: 3, y:35}, {x: 4, y:-18}, {x: 5, y:27}, {x: 6, y:44}, {x: 6, y:15}, {x: 7, y:50}, {x: 8, y:70}]
	highest_point_x = null;
	lowest_point_x = null;
	highest_point_y = null;
	lowest_point_y = null;
	xScale = null;
	yScale = null;
	graph_margin = 20;
	graph_stepSize = 20;
	graph_colWidth = 5;
	graph_rowHeight = 5;
	pre_grid_matrix = [];
  setup = (p5, canvasParentRef) => {
		this.graphW = p5.windowWidth - 250;
		this.graphH = p5.windowHeight/2;
    p5.createCanvas(this.graphW, this.graphH).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
		p5.frameRate(8);
  };
  draw = p5 => {
		p5.push();
		p5.scale(1);
    p5.background(255);
		this.updateScale(p5);
		this.drawGrid(p5);
		//this.plotData(p5);
		p5.pop();

		this.highest_point_x = null;
		this.lowest_point_x = null;
		this.highest_point_y = null;
		this.lowest_point_y = null;
		this.xScale = null;
		this.yScale = null;
    //this.drawGrid(p5);
		//this.drawLines(p5);
  };

	updateScale = (p5) => {
		for(let i = 0; i < this.datapoints.length; i++) {
			if(this.highest_point_y === null && this.lowest_point_y === null) {
				this.highest_point_y = this.datapoints[i].y;
				this.lowest_point_y = this.datapoints[i].y;
			} else if(this.datapoints[i].y > this.highest_point_y){
				this.highest_point_y = this.datapoints[i].y;
			} else if(this.datapoints[i].y < this.lowest_point_y) {
				this.lowest_point_y = this.datapoints[i].y;
			}
		}
		for(let i = 0; i < this.datapoints.length; i++) {
			if(this.highest_point_x === null && this.lowest_point_x === null) {
				this.highest_point_x = this.datapoints[i].x;
				this.lowest_point_x = this.datapoints[i].x;
			} else if(this.datapoints[i].x > this.highest_point_x){
				this.highest_point_x = this.datapoints[i].x;
			} else if(this.datapoints[i].x < this.lowest_point_x) {
				this.lowest_point_x = this.datapoints[i].x;
			}
		}
		this.xScale = (p5.width)/this.datapoints.length;
		this.yScale = (p5.height)/(this.highest_point_y - this.lowest_point_y);
		this.graph_stepSize = p5.height/(this.highest_point_y - this.lowest_point_y);
		this.graph_colWidth = p5.width/(this.highest_point_x - this.lowest_point_x);
		this.graph_rowHeight = p5.height/(this.highest_point_y - this.lowest_point_y);
	}


	drawGrid = (p5) => {
		for (let i = 1; i <= this.datapoints.length;i++) {
			let x = i * this.xScale;
			p5.line(x, this.graph_rowHeight, x, this.graphH - this.graph_margin);
		}
		let count =  0;
		for (let scale = this.highest_point_y; scale >= this.lowest_point_y; scale = scale - this.graph_stepSize) {
			let y = (this.yScale * count * this.graph_stepSize);
			p5.text(Math.round(scale), this.graph_colWidth, y);
			p5.line(this.graph_colWidth, y, this.graphW, y);
			count++;
		}
	}

	plotData = (p5) => {
		for(let i = 0; i < this.datapoints.length - 1; i++) {
			p5.push();
			p5.strokeWeight(4);
			p5.stroke(255, 0, 0);
			p5.line(i*this.xScale, this.datapoints[i].y, (i+1)*this.xScale, this.datapoints[i+1].y);
			p5.pop();
		}
	}


  render() {

    return (
			<div>
				  <Row className="justify-content-md-center mt-2 mb-5">
						<Sketch setup={this.setup} draw={this.draw}/>
					</Row>
					<Row>
					<Col>
						<div>Editiing Stuff here</div>
					</Col>
					</Row>
			</div>
    )
  }
}

export default TempComponent;
