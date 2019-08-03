import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ToastContainer} from 'react-toastify';

ReactDOM.render(<ToastContainer position="bottom-right" autoClose={5000} newestOnTop={false} closeOnClick pauseOnHover />, document.getElementById("toastify"))
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
