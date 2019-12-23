import React, { Component } from "react";
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner, FormControlProps } from "react-bootstrap";
import { connect } from 'react-redux';
import * as Actions from '../actions/authActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import './login.css';


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            valid: false,
            loading: false
        }
    }

    onLogin = (event) => {

        if (event.currentTarget.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ valid: true, loading: true });


            this.props.actions.authenticate(true);
            // try {
            //   await Auth.signIn(this.state.email, this.state.password);
            //   this.props.userHasAuthenticated(true);
            //   this.setState({ redirect: true })
            // } catch (e) {
            //   alert(e.message);
            //   this.setState({ loading: false });
            // }
        }

    }

    onChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    validateForm = () => {
        return emailRegex.test(this.state.email.toLowerCase()) && this.state.password;
    }

    render() {

        if (this.props.isAuthenticated)
            return <Redirect to='/' />


        const {email, password, valid} = this.state;
        
        return (
            <div className="login">
                <Form noValidate validated={valid} onSubmit={this.onLogin}>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            name="email"
                            type="email"
                            value={email}
                            onChange={this.onChange}
                            isValid={emailRegex.test(email.toLowerCase())}
                            required />
                        <FormControl.Feedback type="invalid">Must be a valid email address</FormControl.Feedback>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.onChange}
                            minLength={8}
                            isValid={password.length >= 8}
                            required />
                        <FormControl.Feedback type="invalid">Required field</FormControl.Feedback>
                    </FormGroup>
                    <Button
                        block
                        type="submit"
                        disabled={!this.validateForm()}
                        className='button'
                        >                
                        {this.state.loading ?
                            <span><Spinner size="sm" animation="border" className="mr-2" />Logging in</span> :
                            <span>Log in</span>}
                    </Button>
                </Form >
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);