//UI: (modal) a simple settings menue

import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import { Form, ListGroup } from 'react-bootstrap';

import { useState, useEffect } from 'react'

import ConfigurationSettings from './ConfigurationSettings'
import CocktailSettings from './CocktailSettings'
import UserSettings from './UserSettings'

import { useIngredients } from './api/ingredientsFetchHooks';
import { useSettings } from './api/settingsFetchHooks';


const MachineSettings = () => {
    const { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump } = useSettings();

    const [password, setPassword] = useState('');

    const savePassword = () => {
        if (password != '') {
            editSettings('password', password);
        }
    }

    useEffect(() => {
        if (data && data.config && data.config.password) {
            setPassword(data.config.password);
        }
    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        return (
            <>
                <Form.Group>
                    <Form.Label>Pin Number</Form.Label>
                    <Form.Control type="number" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Form.Text className="text-muted">
                        Enter a new Pin Number.
                    </Form.Text>
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => savePassword()} />
                </Form.Group>
            </>
        )
    }
}

const IngredientSettings = () => {
    const { data, loading, error, refreshIngredients, addIngredient, removeIngredient } = useIngredients();

    const [new_ingredient, setNew_ingredient] = useState('');

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        return (
            <>
                <h6>Add:</h6>
                <Form.Group>
                    <Form.Control type="text" value={new_ingredient} onChange={(event) => setNew_ingredient(event.target.value)} />
                    <Form.Control type="button" value="Add" variant="danger" onClick={() => addIngredient(new_ingredient)} />
                </Form.Group>
                <h6>Remove:</h6>
                <ListGroup variant="flush">
                    {
                        Object.keys(data.ingrediants).map((key) => (
                            <ListGroup.Item key={key}>
                                <Form.Control type="button" value={data.ingrediants[key]} variant="danger" onClick={() => removeIngredient(key)} />
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </>
        )
    }
}

const GlobalSettings = () => {
    return (
        <>
            <h4>Machine Connection</h4>
            <MachineSettings/>
            <h4>Ingredients:</h4>
            <IngredientSettings/>
        </>
    )
}

const SettingsModal = (props) => { 
    return (
        <Modal fullscreen="true" show={props.show} onHide={props.onHide} >
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

export default SettingsModal