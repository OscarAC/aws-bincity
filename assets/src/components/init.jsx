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

        console.log(this.props.isAuthenticated);
        return ( this.props.isAuthenticated ? <City /> : this.renderInit());
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(mapStateToProps, null)(Init);