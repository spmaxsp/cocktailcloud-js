//UI: (modal) a simple settings menue

import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';

class GlobalSettings extends React.Component {
    render() {
        return (
            <>
                <h4>Mashine Connection</h4>
                <h4>known Ingrediants:</h4>
            </>
        )
    }
}

class ConfigurationSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchSettings: {
                error: null,
                isLoaded: false,
                items: {}
            },
            fetchIngrediants: {
                error: null,
                isLoaded: false,
                items: {}
            },
            unsupplyed_ingrediants: []
        };
    }
    
    fetchSettingsData() {
        console.log("fetchSettings")
        fetch("http://localhost:43560/cocktail/info/")
            .then(res => res.json())
            .then((result) => {
                console.log("data: " + result);
                this.setState({
                    fetchSettings: {
                        isLoaded: true,
                        items: result
                    }
                });
                console.log("is Loaded (fetch): " + this.state.fetchSettings.isLoaded);
                console.log("items:" + this.state.fetchSettings.items)
                },

                (error) => {
                    this.setState({
                        fetchSettings: {
                            isLoaded: true,
                            error
                        }
                    });
                    console.log("is Loaded (fetch): " + this.state.fetchSettings.isLoaded);
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
        this.fetchSettingsData();
        this.fetchIngrediantData();
    } 

    //get_unsupplyed_ingrediants() {
    //
    //}

    //renderPumps() {
    //    
    //}

    render() {
        return (
            <>
                <h4>Pumps</h4>
                    <Card body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Pump 1:
                                <Form.Select id="disabledSelect">
                                    <option>Disabled select</option>
                                    <option>Disabled select</option>
                                    <option>Disabled select</option>
                                    <option>Disabled select</option>
                                </Form.Select>
                            </ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Card>
                <h4>Manual Ingrediants</h4>
                <Select options={['test1','test2','test3']} isMulti />
            </>
        )
    }
}

class UserSettings extends React.Component {
    fetchUsers() {
        console.log("fetchcocktailData")
        fetch("http://localhost:43560/user/list")
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

    render() {
        return (
            <>
            </>
        )
    }
}

class CocktailSettings extends React.Component {
    fetchCocktail() {
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

    render() {
        return (
            <>
            </>
        )
    }
}

class SettingsModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal fullscreen="true" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Global Settings</Accordion.Header>
                            <Accordion.Body>
                                <GlobalSettings/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Mashine Configuration</Accordion.Header>
                            <Accordion.Body>
                                <ConfigurationSettings/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>User Settings</Accordion.Header>
                            <Accordion.Body>
                                <UserSettings/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Cocktail Settings</Accordion.Header>
                            <Accordion.Body>
                                <CocktailSettings/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SettingsModal