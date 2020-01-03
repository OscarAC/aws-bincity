import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import City from './city';
import './init.css';

class Init extends Component {


    renderInit = () => {
        return (
            <div className="init">
                <h1>
                    BinCity
                </h1>
                <p>
                    Learn more on the project github repository: 
                </p>
                <p>
                    Please login with the password sent to the e-mail provided at the moment of creating the stack with CloudFormation.
                </p>


                <Button className="button">
                    Login
                </Button>
            </div>
        )
    }

    render() {
        return (this.props.authenticated ? <City /> : this.renderInit());
    }
}


const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading
})


export default connect(mapStateToProps, null)(Init);