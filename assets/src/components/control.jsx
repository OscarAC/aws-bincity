import React, { Component } from "react";
import './control.css';
import { connect } from 'react-redux';
import { fetchCurrentBuilding, updateCurrentBuilding } from '../actions/cityActions';
import PropTypes from 'prop-types';

class Control extends Component {

    constructor(props) {

        super(props);

        this.props.fetchCurrentBuilding();
    }

    onApartmentClick = (floor, apartment, value) => {

        this.props.building.floors[floor][apartment] = value ? 1 : 0;        
        this.props.updateCurrentBuilding(this.props.building);       
    }

    onNewFloorClick = () => {

        this.props.building.floors.push([0,0,0,0,0,0,0,0]);        
        this.props.updateCurrentBuilding(this.props.building);        
    }   

    render() {

        console.log('rendering control');
        const sections = [];
        for (let floor = this.props.building.floors.length - 1; floor >= 0; floor--) {
            sections.push(
                <section key={floor}>
                    <div>{floor}</div>
                    <div>
                        {
                            this.props.building.floors[floor].map((windows, apartment) => {
                                return (<input key={floor+''+apartment}
                                    type="checkbox"
                                    defaultChecked={windows > 0}
                                    onClick={(e) => this.onApartmentClick(floor, apartment, e.target.checked)}>
                                </input>)
                            })
                        }
                    </div>
                </section>
            )
        };

        return (
            <React.Fragment>
                <div className="control">
                    <section>
                        <button onClick={this.onNewFloorClick}>new floor</button>
                    </section>
                    {sections}
                </div>
            </React.Fragment>
        );
    }
}

Control.propTypes = {
    fetchCurrentBuilding: PropTypes.func.isRequired,
    building: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    building: state.buildings.building
});

export default connect(mapStateToProps, { fetchCurrentBuilding, updateCurrentBuilding })(Control);