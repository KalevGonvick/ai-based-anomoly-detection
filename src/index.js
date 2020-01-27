import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'holderjs'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainApplication from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainApplication />, document.getElementById('root'));

serviceWorker.unregister();
