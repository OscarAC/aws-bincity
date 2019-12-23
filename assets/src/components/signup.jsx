import React, { Component } from "react";
import { connect } from 'react-redux';
import City from './city';

class SignUp extends Component {
    
    render() {

        console.log(this.props.isAuthenticated);
        return ( <div>SignUp</div>);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(mapStateToProps, null)(SignUp);