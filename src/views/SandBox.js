import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import * as CONSTANTS from '../configurations';

/* apex chart stuff */
// import ApexCharts from 'apexcharts'
// import Chart from 'react-apexcharts'
// import '../apexcharts.css'

/* this is the sandbox component for users -- this is a temporary test case to show how it works */
class SandBox extends Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	options: CONSTANTS.chart_options,
		// 	series: [{ data: [] }]
		// };
	}

	updateData = () => {
    // const x = Math.floor(new Date().getTime() / 1000);
    // const y = Math.floor(Math.random() * 90);
		//
    // let { data } = this.state.series[0];
    // data.push({ x, y });
		//
    // this.setState({ series: [{ data }] }, () =>
    //   ApexCharts.exec("realtime_data_display", "updateSeries", this.state.series)
    // );
		//
    // // stop data array from leaking memory and growing too big
    // if (data.length > 150) this.resetData();
  };

	resetData = () => {
    // const { data } = this.state.series[0];
		// this.setState({
    //   series: [{ data: data.slice(data.length - 50, data.length) }]
    // });
  };

	componentWillUnmount() {
			// clearInterval(this.updateInterval);
	}

	componentDidMount() {
		//this.updateInterval = setInterval(() => this.updateData(), CONSTANTS.animation_interval);
	}


  render() {
		const { options, series } = this.state;
    return (
			<div>
			</div>
    )
  }
}

export default SandBox;
