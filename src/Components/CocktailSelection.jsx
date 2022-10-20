//lists the cocktails cards (Cocktial Card) in a grid (sortable?)
import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CocktailCard from './CocktailCard'

class SortMenue extends React.Component {
    render() {
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
}

class CocktailSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    fetchData() {
        console.log("fetchData")
        fetch("http://localhost:43560/cocktail/list")
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                this.setState({
                        isLoaded: true,
                        items: result
                    });
                console.log("is Loaded (fetch): " + this.state.isLoaded);
                console.log("items:" + this.state.items)
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log("is Loaded (fetch): " + this.state.isLoaded);
                }
            )
    }
    
    componentDidMount() {
        this.fetchData();
        console.log("is Loaded (Mount): " + this.state.isLoaded);
    } 

    renderCard(id) {
        return <CocktailCard id={id} />;
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return( <div>Error: {error.message}</div> );
        } 
        else if (!isLoaded) {
            return( <div>Loading...</div> );
        }
        else {
            return(
                <Container>
                    <SortMenue/>
                    <Container>
                        <Row pb={4}>
                            { items.map(this.renderCard) }
                        </Row>
                    </Container>
                </Container>
            );
        }
    }
}

export default CocktailSelection;




