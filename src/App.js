import React, { Component } from 'react';
import { play, exit } from './timelines/timelines'
import Nav from './Nav'
import {
  TransitionGroup,
  Transition
} from "react-transition-group";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';
import './AnomalyTheme.css';

import {
  AnomalyNavBar,
  AnomalyCaro,
  AnomalyOptionCards
} from './components/PageComponents';

import {
  Row,
  Col,
  Card
} from 'react-bootstrap'


class MainApplicationRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-anomaly">
          <AnomalyNavBar />
          <Route render={({ location }) => {
            const { pathname, key } = location;

            return (
              <TransitionGroup component={null}>
                <Transition
                  key={key}
                  appear={true}
                  onEnter={(node, appears) => play(pathname, node, appears)}
                  onExit={(node, appears) => exit(node, appears)}
                  timeout={{enter: 750, exit: 150}}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={MainApplication}/>
                    <Route exact path="/gettingstarted" component={TempComponent}/>
                  </Switch>
                </Transition>
              </TransitionGroup>
            )
          }}/>
        </div>
      </BrowserRouter>
    )
  }
}

class TempComponent extends Component {
  render() {
    return (
      <div>this is another page</div>
    )
  }
}

class MainApplication extends Component {
  constructor() {
    super();
    this.state = {
      page: "default"
    }
  }
  render() {
    return (
      <div>
        <Row className="justify-content-md-center mt-2 mb-5">
          <Col className="txt-container-anomaly">
            <Card className="justify-content-md-center">
              <Card.Body>
                <Card.Title className="p-2 light-txt-anomaly">Summary</Card.Title>
                <Card.Text className="medium-txt-anomaly">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, elit a finibus elementum, velit erat posuere ante, in malesuada sapien nunc aliquam est. Proin condimentum bibendum gravida. In ultrices dignissim nisl, quis placerat mi venenatis vel. Nulla cursus neque a fringilla lacinia. Nunc venenatis ultrices iaculis. Vestibulum ac bibendum sem. Integer imperdiet tortor laoreet, vulputate dui id, condimentum tortor. Cras vestibulum vulputate turpis, sed eleifend dolor tincidunt ut. Praesent non interdum magna. Integer aliquam mi at est cursus, in scelerisque tellus facilisis. Donec in tempus nulla. Fusce convallis imperdiet odio, vitae pellentesque odio facilisis vel. Aenean eget posuere ex.
                  <br />
                  Nullam accumsan sapien ut enim condimentum, et aliquet libero laoreet. Proin iaculis consectetur nunc, ut sodales risus iaculis sit amet. Nullam accumsan consequat dolor, eget pharetra velit venenatis at. Duis sit amet ultricies nibh. Integer et tempor felis. Donec at tempor velit. Aenean iaculis ligula lorem, at sodales magna mattis vitae. Morbi sit amet orci felis. Praesent venenatis, eros eu interdum ultrices, arcu metus tincidunt enim, ut congue nunc neque posuere libero.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="caro-container-anomaly">
            <AnomalyCaro />
          </Col>
        </Row>
        <hr className="medium-clr-anomaly"/>
        <Row className="justify-content-md-center align-items-center">
          <Col xs lg="2" className="txt-container-anomaly">
            <AnomalyOptionCards
              innerText={"Some text goes here about trying it out."}
              buttonText={"Try It Out"}
            />
          </Col>
          <Col md="auto" className="txt-container-anomaly">
            <AnomalyOptionCards
              innerText={"Some text goes here about Signing Up."}
              buttonText={"Sign Up"}
            />
          </Col>
          <Col xs lg="2" className="txt-container-anomaly">
            <AnomalyOptionCards
              innerText={"Some text goes here about logging in."}
              buttonText={"Log Up"}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainApplicationRouter;
