import React, { Component } from "react";
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner } from "react-bootstrap";
import { connect } from 'react-redux';
import * as Actions from '../actions/authActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import './login.css';
import { emailRegex } from '../util';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            valid: false,
            newPassword: ''
        }
    }

    onLogin = (event) => {

        if (event.currentTarget.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            this.props.actions.authenticate(this.state.email, this.state.password);
        }
    }

    onPasswordUpdate = (event) => {

        if (event.currentTarget.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            this.props.actions.updatePassword(this.props.user, this.state.newPassword);
        }
    }

    onChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    validateForm = () => {
        return emailRegex.test(this.state.email.toLowerCase()) && this.state.password;
    }

    renderLoginForm = () => {

        const { email, password, valid } = this.state;

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
                        className='button'>
                        {this.props.loading ?
                            <span><Spinner size="sm" animation="border" className="mr-2" />Logging in</span> :
                            <span>Log in</span>}
                    </Button>

                    {this.props.error ?
                        <span className="errorMessage">Oops! {this.props.errorMessage}</span> :
                        <span></span>
                    }
                </Form >
            </div>);
    }

    renderPasswordUpdateForm = () => {

        const { newPassword, valid } = this.state;

        return (
            <div className="login">
                <Form noValidate validated={valid} onSubmit={this.onPasswordUpdate}>
                    <FormGroup controlId="password">
                        <FormLabel>New Password</FormLabel>
                        <FormControl
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={this.onChange}
                            minLength={8}
                            isValid={newPassword.length >= 8}
                            required />
                        <FormControl.Feedback type="invalid">Required field</FormControl.Feedback>
                    </FormGroup>
                    <Button
                        block
                        type="submit"
                        disabled={!this.validateForm()}
                        className='button'>
                        {this.props.loading ?
                            <span><Spinner size="sm" animation="border" className="mr-2" />Updating</span> :
                            <span>Update password</span>}
                    </Button>

                    {this.props.error ?
                        <span className="errorMessage">Oops! {this.props.errorMessage}</span> :
                        <span></span>
                    }
                </Form >
            </div>);
    }


    render() {

        if (this.props.authenticated)
            return <Redirect to='/' />

        return (this.props.newpasswordrequired ? this.renderPasswordUpdateForm() : this.renderLoginForm());
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading,
    newpasswordrequired: state.auth.newpasswordrequired
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);