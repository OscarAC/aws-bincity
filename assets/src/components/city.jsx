import React, { Component } from "react";
import './city.css';
import Building from './building';
import Control from './control';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/cityActions';


class City extends Component {

    constructor(props) {

        super(props);

        this.props.actions.fetchBuildings();
    }

    onBuildingSelect = (building) => {        
        if(building && typeof(building.number) != 'undefined')
            this.props.actions.setCurrentBuilding(building)
    }

    render() {

        return (
            <div>
                <div className="city">
                    <Control />  
                    {this.props.buildings.map((building, index)=>{
                        return <Building key={index} model={building} onClick={this.onBuildingSelect} />
                    })}                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    buildings: state.buildings.buildings
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(City);
