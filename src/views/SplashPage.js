import React, { Component } from 'react';
import { Row, Col /*, Card*/ } from 'react-bootstrap';
import { WebGlAnimationBG } from '../components/WebGlAnimationBG.js';
// import { AnomalyOptionCards } from '../components/AnomalyOptionCard.js';
// import { AnomalyInfoLarge } from '../components/AnomalyInfoLarge.js';
// import { AnomalyCaro } from '../components/AnomalyCaro.js';

class SplashPage extends Component {
  constructor() {
    super();
    this.state = {
      page: "default"
    }
  }
  render() {
    return (
      <div>
        <WebGlAnimationBG />
      </div>
    );
  }
}

export default SplashPage;
