// a card to display the cocktails on the main screen 
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import OrderDialog from './OrderDialog'
import { useSSRSafeId } from '@restart/ui/esm/ssr';
import { useState } from 'react';

const CocktailCard = (props) => { 
    
    const [fetchCocktail, setFetchCocktail] = useState(
                                                {
                                                    error: null,
                                                    isLoaded: false,
                                                    items: {}
                                                });

    const [fetchIngrediant, setFetchIngrediant] = useState(
                                                {
                                                    error: null,
                                                    isLoaded: false,
                                                    items: {}
                                                });
    
    const [modalShow, setModalShow] = useState(false);

    const fetchCocktailData = (id) => {
        console.log("fetchcocktailData")
        fetch("http://localhost:43560/cocktail/info/" + id)
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                setFetchCocktail({
                        error: null,	
                        isLoaded: true,
                        items: result
                    });	
                console.log("is Loaded (fetch): " + fetchCocktail.isLoaded);
                console.log("items:" + fetchCocktail.items)
                },

            (error) => {
                setFetchCocktail({
                        error: error,
                        isLoaded: true,
                        items: {}
                    });
                console.log("is Loaded (fetch): " + fetchCocktail.isLoaded);
                }
            )
    }

    const fetchIngrediantData = () => {
        console.log("fetchcocktailData")
        fetch("http://localhost:43560/ingrediant/list")
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                setFetchIngrediant({
                            error: null,
                            isLoaded: true,
                            items: result
                        });
                console.log("is Loaded (fetch): " + this.state.fetchIngrediant.isLoaded);
                console.log("items:" + this.state.fetchIngrediant.items)
                },

            (error) => {
                setFetchIngrediant({
                        error: error,
                        isLoaded: true,
                        items: {}
                    }
                );
                console.log("is Loaded (fetch): " + this.state.fetchIngrediant.isLoaded);
            }
            )
    }

    this.fetchCocktailData(props.id);
    this.fetchIngrediantData();

    const { error, isLoaded, items } = fetchCocktail;
    const ingrediants = fetchIngrediant.items;
    if (error) {
        return( <div>Error: {error.message}</div> );
    } 
    else if (!isLoaded) {
        return( <div>Loading...</div> );
    }
    else {
        return(
        <Col xs={12} md={4} pd={4}>
            <Card>
                <Card.Img variant="top" src={"http://localhost:43560/image/get/cocktail/"  + props.id}/>
                <Card.Body>
                    <Card.Title>{items.name}</Card.Title>
                    <Card.Text>
                        <ListGroup variant="flush">
                            {
                                Object.keys(items.recepie).map((key) => (
                                    <ListGroup.Item>{ingrediants[key]}: {items.recepie[key]["amount"]}ml</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        <Badge pill bg="primary">
                            Likes: {items.likes}
                        </Badge>{' '}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Order your "{items.name}"
                    </Button>

                    <OrderDialog
                        id={this.props.id}
                        items={items}
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

