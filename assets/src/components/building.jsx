import React, { Component } from "react";
import './building.css';
import Floor from './floor';

class Building extends Component {

    onClick = () => {        
        this.props.onClick(this.props.model);
    }

    render() {

        let floors = this.props.model.floors;
        let alpha =  10 + 120 * this.props.model.buildingId;
        let delta =  floors.length * 14;

        return (
            <React.Fragment>                
                <div className='building' style={{left: alpha}}>
                    <div className='base'></div>
                    {floors.map((model, floor)=> {
                        return <Floor key={floor} floor={floor} model={model} onClick={this.onClick} />
                    })}                   
                    <div className='roof' onClick={this.onClick} style={{top:delta, left: delta}}></div> 
                </div>
            </React.Fragment>

        );
    }
}

export default Building;