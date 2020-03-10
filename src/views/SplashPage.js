import React, { Component } from 'react';
import { Row, Col , Card, Button, Jumbotron } from 'react-bootstrap';
import { WebGlAnimationBG } from '../components/SplashPageComponents/WebGlAnimationBG.js';
import { Parallax, Background } from 'react-parallax';
import { AnomalyInfoLarge } from '../components/SplashPageComponents/AnomalyInfoLarge.js';
import { AnomalyCaro } from '../components/SplashPageComponents/AnomalyCaro.js';
import Holder from 'react-holder-component';

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
      <Parallax strength={2500}>
      <div>
        <Row className="justify-content-md-center mt-2 mb-5">
          <Col className="txt-container-anomaly">
            <Jumbotron style={{background: 'rgba(233,236,239, 0.6)'}}>
              <div>
                <h1>What is Anomaly Detection?</h1>
                <Row>
                  <Col xs={10} md={6} style={{paddingLeft: '0px'}}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, elit a finibus elementum, velit erat posuere ante, in malesuada sapien nunc aliquam est. Proin condimentum bibendum gravida. In ultrices dignissim nisl, quis placerat mi venenatis vel. Nulla cursus neque a fringilla lacinia. Nunc venenatis ultrices iaculis. Vestibulum ac bibendum sem. Integer imperdiet tortor laoreet, vulputate dui id, condimentum tortor. Cras vestibulum vulputate turpis, sed eleifend dolor tincidunt ut. Praesent non interdum magna. Integer aliquam mi at est cursus, in scelerisque tellus facilisis. Donec in tempus nulla. Fusce convallis imperdiet odio, vitae pellentesque odio facilisis vel. Aenean eget posuere ex.
                    </p>
                  </Col>
                  <Col xs={8} md={6}>
                    <AnomalyCaro />
                  </Col>
                </Row>
                <p>
                  <Button variant="outline-primary">Learn more</Button>
                </p>
              </div>
            </Jumbotron>
          </Col>
        </Row>
        <hr className="medium-clr-anomaly"/>
        <Row className="justify-content-md-center align-items-center">
          <Col md="auto" className="txt-container-anomaly">
          <Jumbotron style={{background: 'rgba(233,236,239, 0.6)'}}>
            <div>
              <h1>How Does Anomaly Detection Work?</h1>
              <Row>
                <Col xs={12} md={8} style={{paddingLeft: '0px'}}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, elit a finibus elementum, velit erat posuere ante, in malesuada sapien nunc aliquam est. Proin condimentum bibendum gravida. In ultrices dignissim nisl, quis placerat mi venenatis vel. Nulla cursus neque a fringilla lacinia. Nunc venenatis ultrices iaculis. Vestibulum ac bibendum sem. Integer imperdiet tortor laoreet, vulputate dui id, condimentum tortor. Cras vestibulum vulputate turpis, sed eleifend dolor tincidunt ut. Praesent non interdum magna. Integer aliquam mi at est cursus, in scelerisque tellus facilisis. Donec in tempus nulla. Fusce convallis imperdiet odio, vitae pellentesque odio facilisis vel. Aenean eget posuere ex.
                  </p>
                </Col>
                <Col xs={6} md={4}>
                  <Holder
                    width="360px"
                    height="180px"
                    bg="#000"
                    className={"card-image-top"}
                    />
                </Col>
              </Row>
              <p>
                <Button variant="outline-primary">Learn more</Button>
              </p>
            </div>
          </Jumbotron>
          </Col>
        </Row>
        <hr className="medium-clr-anomaly"/>
        <Row className="justify-content-md-center align-items-center">
          <Col md="auto" className="txt-container-anomaly">
          <Jumbotron style={{background: 'rgba(233,236,239, 0.6)'}}>
            <div>
              <h1>Get Started Today!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, elit a finibus elementum, velit erat posuere ante, in malesuada sapien nunc aliquam est. Proin condimentum bibendum gravida. In ultrices dignissim nisl, quis placerat mi venenatis vel. Nulla cursus neque a fringilla lacinia. Nunc venenatis ultrices iaculis. Vestibulum ac bibendum sem. Integer imperdiet tortor laoreet, vulputate dui id, condimentum tortor. Cras vestibulum vulputate turpis, sed eleifend dolor tincidunt ut. Praesent non interdum magna. Integer aliquam mi at est cursus, in scelerisque tellus facilisis. Donec in tempus nulla. Fusce convallis imperdiet odio, vitae pellentesque odio facilisis vel. Aenean eget posuere ex.
              </p>
              <p>
                <Button variant="outline-primary">Sign Up</Button>
              </p>
            </div>
          </Jumbotron>
          </Col>
        </Row>
        <hr className="medium-clr-anomaly"/>
        <Row className="justify-content-md-center align-items-center">
          <Col md="auto" className="txt-container-anomaly">
          <Jumbotron style={{background: 'rgba(233,236,239, 0.6)'}}>
            <div>
              <h1>Frequently Asked Questions</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, elit a finibus elementum, velit erat posuere ante, in malesuada sapien nunc aliquam est. Proin condimentum bibendum gravida. In ultrices dignissim nisl, quis placerat mi venenatis vel. Nulla cursus neque a fringilla lacinia. Nunc venenatis ultrices iaculis. Vestibulum ac bibendum sem. Integer imperdiet tortor laoreet, vulputate dui id, condimentum tortor. Cras vestibulum vulputate turpis, sed eleifend dolor tincidunt ut. Praesent non interdum magna. Integer aliquam mi at est cursus, in scelerisque tellus facilisis. Donec in tempus nulla. Fusce convallis imperdiet odio, vitae pellentesque odio facilisis vel. Aenean eget posuere ex.
              </p>
              <p>
                <Button variant="outline-primary">FAQ</Button>
              </p>
            </div>
          </Jumbotron>
          </Col>
        </Row>
        <hr className="medium-clr-anomaly"/>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <AnomalyInfoLarge />
          </Col>
        </Row>
      </div>
          <Background className="custom-bg">
              <WebGlAnimationBG />
          </Background>
      </Parallax>
      </div>
    );
  }
}


export default SplashPage;
