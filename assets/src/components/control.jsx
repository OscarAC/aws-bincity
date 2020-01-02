import React, { Component } from "react";
import './control.css';
import { connect } from 'react-redux';
import * as Actions from '../actions/cityActions';
import { bindActionCreators } from 'redux';
import { Button, Spinner } from "react-bootstrap";
import * as Util from '../util';

class Control extends Component {


    onRealTimeChange = (event) => {

        this.props.actions.setRealTime(event.target.checked);
    }

    onSaveClick = () => {

        this.props.actions.save(this.props.apartments);
    }

    onApartmentClick = (key, value) => {
        
        let apartment = this.props.apartments.find(a=>a.key ==key);
        apartment.value = value ? 1 : 0;
        apartment.dirty = !apartment.dirty;

        this.props.actions.updateApartments(this.props.apartments);
    }

    onNewFloorClick = () => {

        let floorCount = this.props.currentApartments.length / 8;
        if (floorCount < 16) {
            
            this.props.actions.requestNewFloor(this.props.apartments, this.props.building);            
        }
    }

    onDeleteFloorClick = () => {
    }



    renderSections = () => {

        let sections = [];

        for (let i = 0; i < this.props.currentApartments.length / 8; i++) {

            sections.push(
                <section key={this.props.building + '' + i}>
                    <div>{i}</div>
                    <div>

                        {this.props.currentApartments.filter(a => a.floor == i)
                            .map(a => {
                                let id = this.props.building + '' + i + '' + a.apartment;
                                return (<input key={a.key} id={id}
                                    type="checkbox"
                                    defaultChecked={a.value > 0}
                                    onClick={(e) => this.onApartmentClick(a.key, e.target.checked)}>
                                </input>)
                            })
                        }
                    </div>
                </section>
            );
        }

        return sections;
    }

    renderControls = () => {
        return (
            <div>
                <div>
                    <div>
                        <section>
                            <Button className='button save' onClick={this.onSaveClick} disabled={this.props.realtime || !this.props.dirty} >
                                {this.props.loading ?
                                    <span><Spinner size="sm" animation="border" className="mr-2" />Saving</span> :
                                    <span>Save</span>}
                            </Button>
                        </section>
                        <div className="errorMessage">
                            <span>{this.props.error ? this.props.errorMessage : ""}</span>
                        </div>
                        <section>
                            <div><input type="checkbox" onChange={this.onRealTimeChange} checked={this.props.realtime}></input> &nbsp;</div><div>  Real-time save</div>
                        </section>
                    </div>
                    <div className="separator"></div>
                    <section>
                        <div><Button className='button' onClick={this.onNewFloorClick}>new floor</Button> </div>
                        <div><Button className='button' onClick={this.onDeleteFloorClick}>delete floor</Button></div>
                    </section>
                </div>

                <div className="floors">
                    {this.renderSections()}
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="control">
                {this.props.loading ? <div className="loading"></div> : ""}
                {this.renderControls()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    apartments: state.apartments.apartments,
    currentApartments: state.apartments.apartments.filter(a => a.building == state.apartments.building),
    building: state.apartments.building,
    dirty: state.apartments.dirty,
    realtime: state.apartments.realtime,
    loading: state.apartments.saveLoading,
    error: state.apartments.saveError,
    errorMessage: state.apartments.errorMessage
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Control);