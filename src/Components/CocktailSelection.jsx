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
    const [fetcherror, setError] = useState(null);
    const [fetchLoaded, setIsLoaded] = useState(false);
    const [fetchitems, setItems] = useState([]);


    const fetchData = () => {
        console.log("fetchData")
        fetch("http://localhost:43560/cocktail/list")
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                setIsLoaded(true);
                setItems(result);
                setError(null);
                console.log("is Loaded (fetch): " + fetchLoaded);
                console.log("items:" + fetchitems)
                },

                (error) => {
                    setError(error);
                    setItems([]);
                    setIsLoaded(true);
                    console.log("is Loaded (fetch): " + fetchLoaded);
                }
            )
    }
    

    this.fetchData();

    const renderCard = (id) => {
        return <CocktailCard id={id} />;
    }

    if (fetcherror) {
        return( <div>Error: {fetcherror.message}</div> );
    } 
    else if (!fetchLoaded) {
        return( <div>Loading...</div> );
    }
    else {
        return(
            <Container>
                <SortMenue/>
                <Container>
                    <Row pb={4}>
                        { fetchData.map(this.renderCard) }
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default CocktailSelection;




