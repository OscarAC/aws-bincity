import React, { Component } from "react";
import './floor.css';

const wallOneApartments = '10px 0px 0 0 {3}, 20px 0px 0 0 {2}, 30px 0px 0 0 {1}, 40px 0px 0 0 {0}';
const wallTwoApartments = '0px 10px 0 0 {4}, 0px 20px 0 0 {5}, 0px 30px 0 0 {6}, 0px 40px 0 0 {7}';

class Floor extends Component {

    renderApartments = (wallStr, offset) => {
        return {
            boxShadow: wallStr.replace(/{(\d+)}/g, (match, number) => {
                return this.props.apartments
                    .find((x) => x.apartment === parseInt(number)).value > 0 ? 'yellow' : 'black';
            })
        };
    }

    render() {

        let deltaOne = this.props.id * 14;
        let deltaTwo = this.props.id * 14 + 7;

        return (
            <div className="floor">
                <div className='wall-one' onClick={this.props.onClick} style={{ top: deltaOne, left: deltaTwo }}>
                    <div style={this.renderApartments(wallOneApartments, 0)}></div>
                </div>
                <div className='wall-two' onClick={this.props.onClick} style={{ top: deltaTwo, left: deltaOne }}>
                    <div style={this.renderApartments(wallTwoApartments, 4)}></div>
                </div>
            </div>
        );
    }
}

export default Floor;