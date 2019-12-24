import React, { Component } from "react";
import { connect } from 'react-redux';
import City from './city';

class Init extends Component {
    
    renderInit = () => {
        return (
            <div>
                <span>Init</span>
                <div className="button-container col-md-12">
                    <a href="/signup">Sign up to explore the demo</a>
                </div>
            </div>
        )
    }

    render() {        
        return ( this.props.authenticated ? <City /> : this.renderInit());
    }
}


const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    loading: state.auth.loading
})

  
  export default connect(mapStateToProps, null)(Init);