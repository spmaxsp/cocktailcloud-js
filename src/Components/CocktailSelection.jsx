//lists the cocktails cards (Cocktial Card) in a grid (sortable?)
import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CocktailCard from './CocktailCard'
import { useState } from 'react';
import { useEffect } from 'react'

import { useAPI } from './api/ApiContext.js';
import useFetch from './api/fetchHook.js';


const SortMenue = () => {
    return (
        <Container float className='my-4 mx-3'>
            <Row>
                <Col lg={3} className='mb-3'>
                    <InputGroup className="mb-3">
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </Col>
                <Col lg={3} className='mb-3'>
                    <InputGroup className="mb-3">
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </Col>
                <Col className='mb-3 col-lg-auto'>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </Col>
            </Row>            
        </Container>
    );
}

const CocktailSelection = (props) => {

    const { loading, error, data } = useFetch(
                                        {
                                            'db': 'cocktail',
                                            'action': 'list',
                                            'id': null,
                                            'value': null,
                                            'data': null
                                        }
                                        );
    
    const renderCard = (id) => {
        console.log(id);
        //return <CocktailCard key={id} id={id} />;
    }

    if (loading || !data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        console.log(data);
        return(
            <Container>
                <SortMenue/>
                <Container>
                    <Row pb={4}>
                        {data.cocktails.map(renderCard)}
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default CocktailSelection;




