// a card to display the cocktails on the main screen 
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class CocktailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {}
        };
    }

    fetchData() {
        console.log("fetchData")
        fetch("http://localhost:43560/cocktail/info/" + this.props.id)
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
            <Col xs={12} md={4} pd={4}>
                <Card>
                    <Card.Img variant="top" src={"http://localhost:43560/image/get/cocktail/"  + this.props.id}/>
                    <Card.Body>
                        <Card.Title>{items.name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
            );
        }
    }
}

export default CocktailCard;

