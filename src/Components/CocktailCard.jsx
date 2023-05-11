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
import { useCocktailInfo } from './api/cocktailFetchHooks';


const CocktailCard = (props) => { 

    const [modalShow, setModalShow] = useState(false);

    const { data, loading, error, refreshCocktail, editCocktailname, editCocktaillikes, addCocktailIngredients, removeCocktailIngredients, editCocktailIngredients } = useCocktailInfo(props.id);

    
    if (loading || !data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        console.log(data);
        let cocktail = data.cocktail;
        return(
            <Col xs={12} md={4} pd={4}>
                <Card>
                    <Card.Img variant="top" src={"http://localhost:43560/image/get/cocktail/"  + props.id}/>
                    <Card.Body>
                        <Card.Title>{cocktail.name}</Card.Title>
                        <Card.Text>
                            <ListGroup variant="flush">
                                {
                                    Object.keys(cocktail.recepie).map((key) => (
                                        <ListGroup.Item key={key}>{key}: {cocktail.recepie[key]["amount"]}ml</ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <Badge pill bg="primary">
                                Likes: {cocktail.likes}
                            </Badge>{' '}
                        </Card.Text>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Order your "{cocktail.name}"
                        </Button>

                        <OrderDialog
                            id={props.id}
                            data={data}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            key={props.id}
                        />
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default CocktailCard;

