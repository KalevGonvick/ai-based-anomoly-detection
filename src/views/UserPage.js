import React, { Component } from 'react';
import CSVDropzone from '../components/UserPageComponents/CSVDropzone';
import {Row, Col} from 'react-bootstrap';
import * as CONSTANTS from '../configurations';

/* apex chart stuff */
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import '../apexcharts.css'

/* live socket libs */
//import io from 'socket.io-client';
//const socket = io('http://localhost');

/* test JSON stuff */
//import * as respdata from './server_response.json';
//const test_r_predictions = data.r_predicted;
//const test_d_predictions = data.d_predicted;

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
			options: CONSTANTS.second_op,
      series: [{
        name: 'Running',
        data: []
      }, {
        name: 'Waiting',
        data: []
      }],
		};
  }

  updateData = () => {
    const x = Math.floor(new Date().getTime() / CONSTANTS.animation_interval);
    const y = Math.floor(Math.random() * 90);
    const y2 = Math.floor(Math.random() * 90);

    let { data } = this.state.series[0];
    let { data2 } = this.state.series[1];

    data.push({ x, y });
    console.log(data2)
    //data2.push({ x, y2 });

    this.setState({ series: [
      {
      name: "d_predicted",
      data: data
      }, {
      name: "r_predicted",
      data: data
      }]}, () =>
      ApexCharts.exec("realtime_data_display", "updateSeries", this.state.series)
    );

    // stop data array from leaking memory and growing too big
    if (data.length > 150) this.resetData();
  };

  resetData = () => {
    const { data } = this.state.series[0];
    this.setState({
      series: [
        {data: data.slice(data.length - 50, data.length) }]
    });
  };

  componentWillUnmount() {
      clearInterval(this.updateInterval);
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => this.updateData(), CONSTANTS.animation_interval);
    }

  render() {
    const { options, series, events } = this.state;
    return (
      <div>
      <Row className="justify-content-md-center mt-2 mb-5">
        <Col className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="line"
            height={350} />
        </Col>
      </Row>
      <Row>
      <Col>
        <CSVDropzone />
      </Col>
      </Row>
      </div>
    );
  }
}

export default UserPage;
