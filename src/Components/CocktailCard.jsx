// a card to display the cocktails on the main screen 
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.info.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <img src={"http://localhost:43560/image/get/cocktail/"  + props.id} className="img-fluid w-100 m-0 p-0" /> 
                <Container className="p-4">
                    <h5>Recepie:</h5>
                    <ListGroup variant="flush">
                        {
                            Object.keys(props.info.recepie).map((key) => (
                                <ListGroup.Item>{props.ingrediants[key]}: {props.info.recepie[key]["amount"]}ml</ListGroup.Item>
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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

class CocktailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchCocktail: {
                error: null,
                isLoaded: false,
                items: {}
            },
            fetchIngrediant: {
                error: null,
                isLoaded: false,
                items: {}
            },
            modalShow: false,
        };
    }

    fetchCocktailData(id) {
        console.log("fetchcocktailData")
        fetch("http://localhost:43560/cocktail/info/" + id)
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                this.setState({
                    fetchCocktail: {
                        isLoaded: true,
                        items: result
                    }
                });
                console.log("is Loaded (fetch): " + this.state.fetchCocktail.isLoaded);
                console.log("items:" + this.state.fetchCocktail.items)
                },

                (error) => {
                    this.setState({
                        fetchCocktail: {
                            isLoaded: true,
                            error
                        }
                    });
                    console.log("is Loaded (fetch): " + this.state.fetchCocktail.isLoaded);
                }
            )
    }

    fetchIngrediantData() {
        console.log("fetchcocktailData")
        fetch("http://localhost:43560/ingrediant/list")
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                this.setState({
                    fetchIngrediant: {
                            isLoaded: true,
                            items: result
                        }
                    });
                console.log("is Loaded (fetch): " + this.state.fetchIngrediant.isLoaded);
                console.log("items:" + this.state.fetchIngrediant.items)
                },

                (error) => {
                    this.setState({
                        fetchIngrediant: {
                            isLoaded: true,
                            error
                        }
                    });
                    console.log("is Loaded (fetch): " + this.state.fetchIngrediant.isLoaded);
                }
            )
    }
    
    componentDidMount() {
        this.fetchCocktailData(this.props.id);
        this.fetchIngrediantData();
    } 

    render() {
        const { error, isLoaded, items } = this.state.fetchCocktail;
        const ingrediants = this.state.fetchIngrediant.items;
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
                    <Card.Img variant="top" src={"http://localhost:43560/image/get/cocktail/"  + this.props.id}/>
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
                        <Button variant="primary" onClick={() => this.setState({modalShow: true})}>
                            Order your "{items.name}"
                        </Button>

                        <MyVerticallyCenteredModal
                            id={this.props.id}
                            info={items}
                            ingrediants={ingrediants}
                            show={this.state.modalShow}
                            onHide={() => this.setState({modalShow: false})}
                        />
                    </Card.Body>
                </Card>
            </Col>
            );
        }
    }
}

export default CocktailCard;

