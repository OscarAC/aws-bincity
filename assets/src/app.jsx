import React, { Component } from "react";
import { Provider } from 'react-redux';
import store from './store';
import City from './components/city';

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <City />
            </Provider>
        );
    }
}

export default App;