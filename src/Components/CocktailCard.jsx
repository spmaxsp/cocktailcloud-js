// a card to display the cocktails on the main screen 
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import OrderDialog from './OrderDialog'
import { useState } from 'react';

import { useAPI } from './api/ApiContext.js';
import useFetch from './api/fetchHook.js';

const CocktailCard = (props) => { 

    const [modalShow, setModalShow] = useState(false);

    const cocktail_request = {
        'db': 'cocktail',
        'action': 'info',
        'id': props.id,
        'value': null,
        'data': null
    }

    const ingrediant_request = {
        'db': 'ingrediant',
        'action': 'list',
        'id': null,
        'value': null,
        'data': null
    }

    const { forceUpdate, setForceUpdate, api_url, setAPI_URL, options, setOptions } = useAPI();

    const { cocktails, cocktails_loading, cocktails_error, fetchCocktails } = useFetch(cocktail_request, options, api_url)
    const { ingrediants, ingrediants_loading, ingrediants_error, fetchIngrediants } = useFetch(ingrediant_request, options, api_url)

    if (cocktails_loading || ingrediants_loading) {
        return <p>Loading...</p>;
    } else if (cocktails_error || ingrediants_error) {
        return <p>Error!</p>;
    }
    else {
        return(
            <Col xs={12} md={4} pd={4}>
                <Card>
                    <Card.Img variant="top" src={"http://localhost:43560/image/get/cocktail/"  + props.id}/>
                    <Card.Body>
                        <Card.Title>{cocktails[props.id].name}</Card.Title>
                        <Card.Text>
                            <ListGroup variant="flush">
                                {
                                    Object.keys(cocktails[props.id].recepie).map((key) => (
                                        <ListGroup.Item>{ingrediants[key]}: {cocktails[props.id].recepie[key]["amount"]}ml</ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <Badge pill bg="primary">
                                Likes: {cocktails[props.id].likes}
                            </Badge>{' '}
                        </Card.Text>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Order your "{cocktails[props.id].name}"
                        </Button>

                        <OrderDialog
                            id={this.props.id}
                            items={cocktails[props.id]}
                            ingrediants={ingrediants}
                            show={this.state.modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default CocktailCard;

