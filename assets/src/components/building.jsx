import React, { Component } from "react";
import './building.css';
import Floor from './floor';

class Building extends Component {

    onClick = () => {
        this.props.onClick(this.props.id);
    }

    renderFloors = (floorCount) => {

        let floors = [];

        for (let i = 0; i < floorCount; i++) {
            floors.push(
                <Floor key={i} id={i} apartments={this.props.apartments.filter(a=>a.floor == i)} onClick={this.onClick} />
            );
        }

        return floors;
    }

    render() {

        let floorCount = this.props.apartments.length / 8;
        let positionAlpha = 45 + 120 * this.props.id;
        let positionDelta = floorCount * 14;

        return (
            <React.Fragment>
                <div className='building' style={{left: positionAlpha}}>
                    <div className={this.props.selected ? "base selected" : "base"}></div>
                    {this.renderFloors(floorCount)}
                    <div className="roof" onClick={this.onClick} style={{top:positionDelta, left: positionDelta}}></div> 
                </div>
            </React.Fragment>

        );
    }
}

export default Building;