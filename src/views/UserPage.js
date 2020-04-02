import React, { Component } from 'react';
import CSVDropzone from '../components/UserPageComponents/CSVDropzone';
import {Row, Col, Button, Form} from 'react-bootstrap';
import * as CONSTANTS from '../configurations';

/* apex chart stuff */
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'
import '../apexcharts.css'

const global_list_dat = [];

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://34.69.153.94/graphData",
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

  IsJsonString = (str) => {
    if(response) {
    try {
        a = JSON.parse(response);
        return true;
    } catch(e) {
        alert(e);
        return false;
    }
  }
}
  updateData = () => {
    if(global_list_dat.length !== 0 &&  this.state.new_r_predict.length < 1) {
      for(let i = 0; i < global_list_dat.length; i++){
        let temp_json = global_list_dat[i];
        if(this.IsJsonString(temp_json)) {
          temp_json = JSON.parse(temp_json);
          if(temp_json){
            let r_dat = this.state.new_r_predict;
            r_dat.concat(temp_json.r_predicted);
            let d_dat = this.state.new_d_predict;
            d_dat.concat(temp_json.d_predicted);
            let n_dat = this.state.new_n_predict;
            n_dat.concat(temp_json.n_predicted);
            console.log(temp_json.n_predicted);
            this.setState({
              new_r_predict: temp_json.default.r_predicted,
              new_d_predict: temp_json.default.d_predicted,
              new_n_predict: temp_json.default.n_predicted
            })
          }
        }
      }
    }
    const time = Math.floor(new Date().getTime());
    this.update_r_predict(time);
    this.update_d_predict(time);
    this.update_n_predict(time);
  };

  update_r_predict = (time) => {
    const x = time;
    let new_y_dat = this.state.new_r_predict;
    const y = new_y_dat.pop();
    this.setState({
      new_r_predict: new_y_dat
    });
    let { data } = this.state.r_predict_series[0];
    data.push({x, y});
    this.setState({ r_predict_series: [{ data }] }, () =>
      ApexCharts.exec("r_predict_realtime_data_display", "updateSeries", this.state.r_predict_series)
    );
    if (data.length > 150) {
      this.setState({
        r_predict_series: [
          {data: data.slice(data.length - 50, data.length) }]
      });
    }
  }

  update_d_predict = (time) => {
    const x = time;
    let new_y_dat = this.state.new_d_predict;
    const y = new_y_dat.pop();
    this.setState({
      new_d_predict: new_y_dat
    });
    let { data } = this.state.d_predict_series[0];
    data.push({x, y});
    this.setState({ d_predict_series: [{ data }] }, () =>
      ApexCharts.exec("d_predict_realtime_data_display", "updateSeries", this.state.d_predict_series)
    );
    if (data.length > 150) {
      this.setState({
        d_predict_series: [
          {data: data.slice(data.length - 50, data.length) }]
      });
    }
  }

  update_n_predict = (time) => {
    const x = time;
    let new_y_dat = this.state.new_n_predict;
    const y = new_y_dat.pop();
    this.setState({
      new_n_predict: new_y_dat
    });
    let { data } = this.state.n_predict_series[0];
    data.push({x, y});
    this.setState({ n_predict_series: [{ data }] }, () =>
      ApexCharts.exec("n_predict_realtime_data_display", "updateSeries", this.state.n_predict_series)
    );
    if (data.length > 150) {
      this.setState({
        n_predict_series: [
          {data: data.slice(data.length - 50, data.length) }]
      });
    }
  }

  /* THE FUNCTION BELOW IS JUST FOR THE DEMO AND SHOULD NOT BE USED IN A REAL PRODUCT */
  getDemoGraphData = () => {
    fetch(this.state.endpoint, {
      'Access-Control-Allow-Origin': '*'
    }).then((response) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const stream = new ReadableStream({
        start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            const json = decoder.decode(value);
            global_list_dat.push(json);
            push();

          });
        };
        push();
      }
    });
    return new Response(stream, { headers: { "Content-Type": "text/html" } });
  });
}

  componentWillUnmount() {
      clearInterval(this.updateInterval);
  }

  componentDidMount() {
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
      <Row className="mt-3">
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
            height={200} />
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

          <Button onClick={this.getDemoGraphData} variant="primary" type="button">
            Submit
          </Button>
          </Form>
          <div id='debug-spot'></div>
        </Col>
      </Row>
      </div>
    );
  }
}

export default UserPage;
