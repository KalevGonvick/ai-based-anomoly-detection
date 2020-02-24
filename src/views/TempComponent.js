import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap';

/* apex chart stuff */
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import '../apexcharts.css'

/* this is the sandbox component for users -- this is a temporary test case to show how it works */
const TICKINTERVAL = 86400000;
const XAXISRANGE = 777600000;
const ANIMATIONINTERVAL = 1500;

class TempComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			series: [{data: []}],
			options: {
				chart: {
					id: 'realtime',
					height: 350,
					type: 'line',
					background: '#ecf0f1',
					animations: {
						enabled: true,
						easing: 'easeout',
						dynamicAnimation: { speed: ANIMATIONINTERVAL	}},
					toolbar: { show: false },
					zoom: {	enabled: false }
				},
				dataLabels: {
    			enabled: false,
				},
				stroke: {
					curve: 'straight',
					colors: '#2ecc71'
				},
				title: { text: 'Test Dynamic Chart', align: 'left' },
				markers: { size: 0 },
				xaxis: {
					type: 'datetime',
					range: XAXISRANGE,
				 	title: {
						text:'X-Axis',
						offsetX: 0,
        		offsetY: 5,
		        style: {
		            fontSize: '12px',
		            fontFamily: 'Helvetica, Arial, sans-serif',
		            cssClass: 'apexcharts-xaxis-title',
		        },
					}
				},
				yaxis: {
					max: 100,
					title: {
	          text: 'Y-Axis',
	          rotate: 90,
	          offsetX: 0,
	          offsetY: 0,
	          style: {
	              fontSize: '12px',
	              fontFamily: 'Helvetica, Arial, sans-serif',
	              cssClass: 'apexcharts-yaxis-title',
	          },
					}
				 },
				legend: {	show: false },
				theme: {
					pallete: 'pallete4'
				}
			},
		};
		this.lastDate = 0;
		this.data = [];
	}

	getNewSeries = (baseval, yrange) => {
    let newDate = baseval + TICKINTERVAL;
    this.lastDate = newDate

    for(var i = 0; i< this.data.length - 10; i++) {
      // IMPORTANT
      // we reset the x and y of the data which is out of drawing area
      // to prevent memory leaks
      this.data[i].x = newDate - XAXISRANGE - TICKINTERVAL
      this.data[i].y = 0
    }
		this.data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })
	}

	componentDidMount() {
		window.setInterval(() => {

			/*
			 * Temp function to get random data
			 * We will change this to update recieve data from the server instead
			*/
			this.getNewSeries(this.lastDate, {
				min: 10,
				max: 90
			});
			ApexCharts.exec('realtime', 'updateSeries', [{
				data: this.data
			}]);
		}, ANIMATIONINTERVAL)
	}


  render() {

    return (
			<div>
				  <Row className="justify-content-md-center mt-2 mb-5">
						<Col className="apexcharts-container">
							<Chart
								options={this.state.options}
								series={this.state.series}
								type="line"
								height={350} />
						</Col>
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
