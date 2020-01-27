import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'holderjs'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainApplicationRouter from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainApplicationRouter />, document.getElementById('root'));

serviceWorker.unregister();
