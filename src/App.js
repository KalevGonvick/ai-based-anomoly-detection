import React, { Component } from 'react';

import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import './AnomalyTheme.css';
import { AnomalyNavBar } from './components/PageComponents';
import Homepage from './views/Homepage.js'
import TempComponent from './views/TempComponent.js'

class MainApplicationRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-anomaly">
          <AnomalyNavBar />
          <Route render={({ location }) => {
            return (
              <TransitionGroup component={null}>
                <CSSTransition
                  appear={true}
									nmountOnExit
                  className={"SlideIn"}
									timeout={300}
                >
                  <Switch location={location}>
										<Route exact path="/" component={Homepage}/>
                    <Route exact path="/home" component={Homepage}/>
                    <Route exact path="/gettingstarted" component={TempComponent}/>
										<Route exact path="/faq" component={TempComponent}/>
										<Route exact path="/about" component={TempComponent}/>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )
          }
				}/>
        </div>
      </BrowserRouter>
    )
  }
}
export default MainApplicationRouter;
