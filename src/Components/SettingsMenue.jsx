//UI: (modal) a simple settings menue

import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import ConfigurationSettings from './ConfigurationSettings'

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