//the final screen/popup from where a selected cocktail can be orderd

import React from 'react';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

const OrderDialog = (props) => {
    const [size_input, setSize_input] = useState(1);

    const Order = () => {
        console.log("Ordering Cocktail: " + props.id + " with size: " + size_input);
    }

    let cocktail = props.data.cocktail;
    return (
        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {cocktail.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <img src={"http://localhost:43560/image/get/cocktail/"  + props.id} className="img-fluid w-100 m-0 p-0" /> 
                <Container className="p-4">
                    <h5>Recepie:</h5>
                    <ListGroup variant="flush">
                        {
                            Object.keys(cocktail.recepie).map((key) => (
                                <ListGroup.Item key={key}>{key}: {cocktail.recepie[key]["amount"]}ml</ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                    <Form.Label>Size Correction: x{size_input}</Form.Label>
                    
                    <Form.Range min={0.5} max={2} step={0.1} defaultValue={1} onChange={(event) => setSize_input(event.target.value)} />
                    <Button variant="primary" onClick={() => Order()}>
                        Order
                    </Button>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderDialog;