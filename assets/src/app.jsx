import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Form, Nav, Navbar, Button } from "react-bootstrap";
import Init from './components/init';
import NotFound from './components/notfound';
import './app.css';
import Login from "./components/login";
import SignUp from './components/signup';
import { connect } from 'react-redux';
import * as Actions from './actions/authActions';
import { bindActionCreators } from 'redux';

class App extends Component {

  showLoggedInBar = () => (
    <Form inline>
      <Button variant="outline-light" className="button" onClick={this.handleLogout}>Log out</Button>
    </Form>
  );

  showLoggedOutBar = () => (
    <Form inline>
      <Button variant="outline-light" href="/signup" className="mr-sm-2 button">Sign up</Button>
      <Button variant="outline-light" href="/login" className="button">Login</Button>
    </Form>
  );

  handleLogout = () => {
    this.props.actions.logout();
  }

  render() {

    return (
      <div className="App container">
        <Navbar navbar-light="true" className="mb-3 navbar-default">
          <Navbar.Brand href="/">BinCity</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              {this.props.isAuthenticated ? this.showLoggedInBar() : this.showLoggedOutBar()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>          
          <Route path="/" exact component={Init} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route component={NotFound} />
        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);