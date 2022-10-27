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
            unsupplyed_ingrediants: []
        };
    }
    
    fetchAPI(request) {
        return fetch(request, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(response => response.json())
    }

    componentDidMount() {
        const api_request = ['http://localhost:43560/settings/info',
                             'http://localhost:43560/ingrediant/list'];
        Promise.all(api_request.map(this.fetchAPI)).then(
        ([configuration, ingrediants]) => {
            this.setState({
                configuration,
                ingrediants,
                unsupplyed_ingrediants: this.get_unsupplyed_ingrediants(configuration,ingrediants)
            });
        },
        (error) => {
            console.log("error fetching resources:");
            console.log(error);
        })
    } 

    get_unsupplyed_ingrediants(configuration,ingrediants) {
        const unsupplyed_ingrediants = []
        for (const id of Object.keys(ingrediants)){
            if (!Object.values(configuration.pump).includes(id) && !configuration.manual.includes(id)){
                unsupplyed_ingrediants.push(id);
            }
        }
        return(unsupplyed_ingrediants); 
    }

    renderPumps() {
        
    }

    generate_optionlist() {
        const result = [];
        this.state.unsupplyed_ingrediants.forEach((key, i) => result.push({ value: key, label: this.state.ingrediants[key] }));
        console.log(result);
        return result;
    }

    update_manual(value) {
        console.log(value);
    }

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
                <Select options={this.generate_optionlist()} onChange={value => this.update_manual(value)} isMulti />
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