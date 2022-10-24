//the final screen/popup from where a selected cocktail can be orderd

import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

class OrderDialog extends React.Component {
    render() {
        return (
            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.items.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <img src={"http://localhost:43560/image/get/cocktail/"  + this.props.id} className="img-fluid w-100 m-0 p-0" /> 
                    <Container className="p-4">
                        <h5>Recepie:</h5>
                        <ListGroup variant="flush">
                            {
                                Object.keys(this.props.items.recepie).map((key) => (
                                    <ListGroup.Item>{this.props.ingrediants[key]}: {this.props.items.recepie[key]["amount"]}ml</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        <Form.Label>Range</Form.Label>
                        <Form.Range />
                        <Form.Label>Range</Form.Label>
                        <Form.Range />
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OrderDialog;