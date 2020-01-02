import React, { Component } from "react";
import './city.css';
import './decor.css';
import Building from './building';
import Control from './control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/cityActions';
import { Container, Row, Col, Spinner } from "react-bootstrap";

class City extends Component {

    constructor(props) {

        super(props);

        this.props.actions.fetchApartments();
    }

    onBuildingSelect = (building) => {

        this.props.actions.setCurrentBuilding(building)
    }

    renderBuildings = () => {

        let buildings = [];
        for (let i = 0; i < 4; i++) {
            buildings.push(<Building key={i} id={i}
                onClick={this.onBuildingSelect}
                selected={this.props.building === i}
                apartments={this.props.apartments.filter(a => a.building == i)} />
            )
        }
        return buildings;
    }

    renderCity = () => {
        return (
            <Container className="h-100">
                <Row className="h-100">
                    <Col className="h-100">
                        <div className="city">
                            {this.renderBuildings()}
                            <div className="street">
                                <div className="road"></div>
                                <div className="car"></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs lg="2" className="h-100">
                        <Control />
                    </Col>
                </Row>
            </Container>
        )
    }

    renderLoading = () => {

        return <Container className="h-100"><Row className="h-100"><Spinner size="sm" animation="border" className="mr-2" /></Row></Container>
    }


    renderErrorPage = () => {

        return (<Container className="h-100">
            <Row className="h-100">
                <Col className="h-100">
                    <br />
                    {this.props.errorMessage}
                </Col>
            </Row>
        </Container>)
    }

    render() {

        return (
            this.props.loading ?
                this.renderLoading()
                :
                this.props.error ?
                    this.renderErrorPage()
                    :
                    this.renderCity()
        );
    }
}

const mapStateToProps = state => ({
    apartments: state.apartments.apartments,
    building: state.apartments.building,
    loading: state.apartments.loading,
    error: state.apartments.error,
    errorMessage: state.apartments.errorMessage,
    dirty: state.apartments.dirty
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(City);
