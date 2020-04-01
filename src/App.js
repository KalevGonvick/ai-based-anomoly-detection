import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { AnomalyNavBar } from './components/AnomalyNavBar';

/* views */
import SplashPage from './views/SplashPage.js';
import GettingStartedPage from './views/GettingStartedPage.js';
//import SandBox from './views/SandBox.js';
import FAQPage from './views/FAQPage.js';
import UserPage from './views/UserPage.js';

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
              <Route exact path="/FAQ" component={FAQPage} />
              <Route exact path="/My-Profile" component={UserPage} />
							<Route exact path="/getting-started" component={GettingStartedPage}/>
			      	
			    	</AnimatedSwitch>
					</div>
  		</Router>

    )
  }
}
export default MainApplicationRouter;
