import React, { Component } from "react";
import { connect } from 'react-redux';
import * as Actions from '../actions/signupActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { Form, FormGroup, FormControl, FormLabel, Button, Spinner, FormControlProps } from 'react-bootstrap';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { emailRegex } from '../actions/util';
import './signup.css';
import { ConsoleLogger } from "@aws-amplify/core";

class SignUp extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            valid: false
        };
    }

    onChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    validateForm = () => {
        return emailRegex.test(this.state.email.toLowerCase()) && this.state.password &&
            this.state.password === this.state.confirmPassword;
    }

    validateConfirmForm = () => {
        return this.state.confirmationCode;
    }

    onSignup = (event) => {

        if (event.currentTarget.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            this.props.actions.signup(this.state.email, this.state.password);
        }
    }

    onConfirm = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });

        // try {
        //   await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
        //   await Auth.signIn(this.state.email, this.state.password);
        //   this.props.userHasAuthenticated(true);
        //   this.setState({ redirect: true })
        // } catch (e) {
        //   alert(e.message);
        //   this.setState({ loading: false });
        // }
    }

    showConfirmationForm = () => {
        // if (this.state.redirect) return <Redirect to='/' />
        const { confirmationCode } = this.state;

        return (
            <Form noValidate onSubmit={this.onConfirm}>
                <FormGroup controlId="confirmationCode">
                    <FormLabel>Confirmation code</FormLabel>
                    <FormControl name="confirmationCode" type="tel" value={confirmationCode} onChange={this.onChange} minLength={1} required />
                    <FormControl.Feedback />
                    <Form.Text className="text-muted">A confirmation code will be sent to the email address provided</Form.Text>
                </FormGroup>
                <Button block type="submit" disabled={!this.validateConfirmForm()}>
                    {this.props.loading ?
                        <span><Spinner size="sm" animation="border" className="mr-2" />Confirming</span> :
                        <span>Confirm</span>}
                </Button>
            </Form>
        );
    }

    showSignupForm = () => {
        const { email, password, confirmPassword, validated } = this.state;
        return (
            <Form noValidate validated={validated} onSubmit={(e) => this.onSignup(e)}>
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl name="email" type="email" onChange={this.onChange} value={email} minLength={5} isValid={emailRegex.test(email.toLowerCase())} required />
                    <FormControl.Feedback type="invalid">Please provide a valid E-mail address</FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="password" >
                    <FormLabel>Password</FormLabel>
                    <FormControl name="password" type="password" onChange={this.onChange} value={password} minLength={8} isValid={password.length >= 8} required />
                    <FormControl.Feedback type="invalid">Password must be at least 8 characters</FormControl.Feedback>
                    <Form.Text className="text-muted">Must be at least 8 characters</Form.Text>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl name="confirmPassword" type="password" onChange={this.onChange} value={confirmPassword} minLength={8} isValid={confirmPassword.length >= 8 && password === confirmPassword} required />
                    <FormControl.Feedback type="invalid">Passwords must be identical</FormControl.Feedback>
                </FormGroup>
                <Button block type="submit" className="button" disabled={!this.validateForm()}>
                    {this.props.loading ?
                        <span><Spinner size="sm" animation="border" className="mr-2" />Signing up</span> :
                        <span>Sign up</span>}
                </Button>
                {this.props.error ?
                    <span className="errorMessage">Oops! {this.props.errorMessage}</span> :
                    <span></span>
                }
            </Form>
        );
    }

    render() {
        console.log('rendering signup');

        if (this.props.user != undefined && this.props.confirmed)
            return <Redirect to='/' />

        return (
            <div className="signup">
                {this.state.user === undefined ? this.showSignupForm() : this.showConfirmationForm()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.signup.user,
    error: state.signup.error,
    errorMessage: state.signup.errorMessage,
    loading: state.signup.loading,
    confirmed: state.signup.confimed
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);