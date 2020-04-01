import React, { Component } from 'react';
import CSVDropzone from '../components/UserPageComponents/CSVDropzone';
import {Row, Col, Button, Form} from 'react-bootstrap';
import * as CONSTANTS from '../configurations';

/* apex chart stuff */
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import '../apexcharts.css'

/* live socket libs */
import socketIOClient from "socket.io-client";

/* test JSON stuff */
//import * as respdata from './server_response.json';
//const test_r_predictions = data.r_predicted;
//const test_d_predictions = data.d_predicted;

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3000",
      new_r_predict: [],
      new_d_predict: [],
      new_n_predict: [],
			r_options: CONSTANTS.r_chart_options,
      d_options: CONSTANTS.d_chart_options,
      n_options: CONSTANTS.n_chart_options,
      re_options: CONSTANTS.re_chart_options,
      de_options: CONSTANTS.de_chart_options,
      r_predict_series: [{
        name: 'r_predict',
        data: [] }],
      d_predict_series: [{
        name: 'd_predict',
        data: [] }],
      n_predict_series: [{
        name: 'n_predict',
        data: [] }],
      re_predict_series: [{
        name: 'r_predict_error',
        data: [] }],
      de_predict_series: [{
        name: 'd_predict_error',
        data: [] }]
		};
  }

  updateData = () => {
    const time = Math.floor(new Date().getTime());
    let r_dat = this.state.new_r_predict;
    let d_dat = this.state.new_d_predict;
    let n_dat = this.state.new_n_predict;
    if(r_dat.length > 0){
      this.update_r_predict(time, r_dat.shift());
    } else {
      this.update_r_predict(time, null);
    }
    if(d_dat.length > 0){
      this.update_d_predict(time, d_dat.shift());
    } else {
      this.update_d_predict(time, null);
    }
    if(n_dat.length > 0){
      this.update_n_predict(time, n_dat.shift());
    } else {
      this.update_n_predict(time, null);
    }

    this.setState({
      new_r_predict: r_dat,
      new_d_predict: d_dat,
      new_n_predict: n_dat
    })
    /* for some reason this does not work?!?!?!? */
    //this.update_r_error(time);
    //this.update_d_error(time);
  };

  addToQueue = (data) => {
    let new_r_predict_dat = this.state.new_r_predict
    new_r_predict_dat.push(data.r_predicted);
    let new_d_predict_dat = this.state.new_d_predict
    new_d_predict_dat.push(data.d_predicted);
    let new_n_predict_dat = this.state.new_n_predict
    new_n_predict_dat.push(data.n_predicted);
    this.setState({
      new_r_predict: new_r_predict_dat,
      new_d_predict: new_d_predict_dat,
      new_n_predict: new_n_predict_dat
    })
  }

  update_r_predict = (time, dat) => {
    const x = time;
    const y = dat;
    let { data } = this.state.r_predict_series[0];
    data.push({x, y});
    this.setState({ r_predict_series: [{ data }] }, () =>
      ApexCharts.exec("r_predict_realtime_data_display", "updateSeries", this.state.r_predict_series)
    );
    //if (data.length > 150) this.resetData();
  }

  update_d_predict = (time, dat) => {
    const x = time;
    const y = dat;
    let { data } = this.state.d_predict_series[0];
    data.push({x, y});
    this.setState({ d_predict_series: [{ data }] }, () =>
      ApexCharts.exec("d_predict_realtime_data_display", "updateSeries", this.state.d_predict_series)
    );
    //if (data.length > 150) this.resetData();
  }

  update_n_predict = (time, dat) => {
    const x = time;
    const y = dat
    let { data } = this.state.n_predict_series[0];
    data.push({x, y});
    this.setState({ n_predict_series: [{ data }] }, () =>
      ApexCharts.exec("n_predict_realtime_data_display", "updateSeries", this.state.n_predict_series)
    );
    //if (data.length > 150) this.resetData();
  }

  update_r_error = (time) => {
    const x = time;
    const y = Math.floor(Math.random() * 90);
    let { data } = this.state.re_predict_series[0];
    data.push({x, y});
    this.setState({ re_predict_series: [{ data }] }, () =>
      ApexCharts.exec("re_realtime_data_display", "updateSeries", this.re_predict_series)
    );
    //if (data.length > 150) this.resetData();
  }

  update_d_error = (time) => {
    const x = time;
    const y = Math.floor(Math.random() * 90);
    let { data } = this.state.de_predict_series[0];
    data.push({x, y});
    this.setState({ de_predict_series: [{ data }] }, () =>
      ApexCharts.exec("de_realtime_data_display", "updateSeries", this.de_predict_series)
    );
    //if (data.length > 150) this.resetData();
  }

  resetData = () => {
    // const { data } = this.state.series[0];
    // this.setState({
    //   series: [
    //     {data: data.slice(data.length - 50, data.length) }]
    // });
  };

  componentWillUnmount() {
      clearInterval(this.updateInterval);
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("anomaly-get", data => this.addToQueue(data));
    this.updateInterval = setInterval(() => this.updateData(), CONSTANTS.animation_interval);
    }

  render() {
    const {
      r_options,
      r_predict_series,
      d_options,
      d_predict_series,
      n_options,
      n_predict_series,
      re_options,
      re_predict_series,
      de_options,
      de_predict_series } = this.state;
    return (
      <div>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Chart
            options={r_options}
            series={r_predict_series}
            type="line"
            height={200} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Chart
            options={d_options}
            series={d_predict_series}
            type="line"
            height={200} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Chart
            options={n_options}
            series={n_predict_series}
            type="line"
            height={150} />
        </Col>
      </Row>
      <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <CSVDropzone />
      </Col>
      </Row>
      <Row className="mb-2">
        <Col md={{ span: 10, offset: 1 }}>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEpoch">
              <Form.Label>Epochs</Form.Label>
              <Form.Control type="number" placeholder="Enter the number of epochs..." />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridXWindow">
              <Form.Label>X-Window</Form.Label>
              <Form.Control type="number" placeholder="Enter how far ahead you want to predict..." />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridFeatures">
              <Form.Label>Features</Form.Label>
              <Form.Control type="number" placeholder="Enter the amount of features..." />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBatch">
              <Form.Label>Batch Size</Form.Label>
              <Form.Control type="number" placeholder="Enter the batch size..."/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTrainSize">
              <Form.Label>Train Size</Form.Label>
              <Form.Control type="number" placeholder="Enter the train size size..."/>
            </Form.Group>
          </Form.Row>

          <Button onClick={() => {alert('Demo only, form is only visual')}} variant="primary" type="button">
            Submit
          </Button>
          </Form>
        </Col>
      </Row>
      </div>
    );
  }
}

export default UserPage;

// ** for some reason this does not work?!?!?!?
// <Row className="justify-content-md-center">
//   <Col className="mixed-chart">
//     <Chart
//       options={re_options}
//       series={re_predict_series}
//       type="line"
//       height={200} />
//   </Col>
//   <Col className="line-chart">
//     <Chart
//       options={de_options}
//       series={de_predict_series}
//       type="line"
//       height={200} />
//   </Col>
// </Row>
