import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { AnomalyNavBar } from './components/AnomalyNavBar';

/* views */
import Homepage from './views/Homepage.js'
import TempComponent from './views/TempComponent.js'

/* CSS */
import './AnomalyTheme.css';
import './App.css';

class MainApplicationRouter extends Component {
  render() {
    return (
				<Router>
					<div className="container-anomaly">
						<AnomalyNavBar />
				    <AnimatedSwitch
				      atEnter={{ opacity: 0 }}
				      atLeave={{ opacity: 0 }}
				      atActive={{ opacity: 1 }}
				      className="switch-wrapper"
				    >
			      	<Route exact path="/" component={Homepage} />
			      	<Route path="/example-sandbox" component={TempComponent}/>
			    	</AnimatedSwitch>
					</div>
  		</Router>

    )
  }
}
export default MainApplicationRouter;
