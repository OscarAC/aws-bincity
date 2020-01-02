import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app'
import Amplify from "@aws-amplify/core";

import config from './config.json';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.region,
        userPoolId: config.cognito.userPoolId,
        identityPoolId: config.cognito.identityPoolId,
        userPoolWebClientId: config.cognito.clientId
    },
    API: {
        endpoints: [
            {
                name: "apartments",
                endpoint: config.gateway.url,
                region: config.region
            },
        ]
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
