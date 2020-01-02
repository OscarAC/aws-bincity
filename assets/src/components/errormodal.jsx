import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import './errormodal.css';


class ErrorModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            show: true
        }
    }

    handleClose = () => {

        this.setState({
            show: false
        });
    }

    render() {        
        return (
            <Modal dialogClassName="errormodal" show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.message}</Modal.Body>
                
            </Modal>
        );
    }
}

export default ErrorModal;