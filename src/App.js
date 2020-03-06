import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { AnomalyNavBar } from './components/AnomalyNavBar';

/* views */
import SplashPage from './views/SplashPage.js'
import GettingStartedPage from './views/GettingStartedPage.js'
import SandBox from './views/SandBox.js'

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
			      	<Route exact path="/" component={SplashPage} />
							<Route exact path="/getting-started" component={GettingStartedPage}/>
			      	<Route path="/sandbox" component={SandBox}/>
			    	</AnimatedSwitch>
					</div>
  		</Router>

    )
  }
}
export default MainApplicationRouter;
