//UI: (modal) a simple settings menue

import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Container, Form, ListGroup } from 'react-bootstrap';

import { useState, useEffect } from 'react'

import ConfigurationSettings from './ConfigurationSettings'
import CocktailSettings from './CocktailSettings'
import UserSettings from './UserSettings'

import { useIngredients } from './api/ingredientsFetchHooks';
import { useSettings } from './api/settingsFetchHooks';


const GlobalSettings = () => {
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

const ConnectionSettings = () => {
    const { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump } = useSettings();

    const [api_ip, setApiIp] = useState('');
    const [api_port, setApiPort] = useState('');
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');

    const saveApiIp = () => {
        if (api_ip != '') {
            editSettings('api_ip', api_ip);
        }
    }

    const saveApiPort = () => {
        if (api_port != '') {
            editSettings('api_port', api_port);
        }
    }

    const saveIp = () => {
        if (ip != '') {
            editSettings('machine_ip', ip);
        }
    }

    const savePort = () => {
        if (port != '') {
            editSettings('machine_port', port);
        }
    }

    useEffect(() => {
        if (data && data.config) {
            setApiIp(data.config.api_ip);
            setApiPort(data.config.api_port);
            setIp(data.config.machine_ip);
            setPort(data.config.machine_port);
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
                    <Form.Label>Api IP</Form.Label>
                    <Form.Control type="text" value={api_ip} onChange={(event) => setApiIp(event.target.value)} />
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => saveApiIp()} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Api Port</Form.Label>
                    <Form.Control type="number" value={api_port} onChange={(event) => setApiPort(event.target.value)} />
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => saveApiPort()} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>IP</Form.Label>
                    <Form.Control type="text" value={ip} onChange={(event) => setIp(event.target.value)} />
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => saveIp()} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Port</Form.Label>
                    <Form.Control type="number" value={port} onChange={(event) => setPort(event.target.value)} />
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => savePort()} />
                </Form.Group>
            </>
        )
    }
}

const SettingsModal = (props) => { 
    return (
        <Modal fullscreen="xl-down" show={props.show} onHide={props.onHide} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="0" title="Global Settings">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <GlobalSettings />
                    </div>
                </Tab>
                <Tab eventKey="1" title="Ingredient Settings">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <IngredientSettings />
                    </div>
                </Tab>
                <Tab eventKey="2" title="Machine Configuration">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <ConfigurationSettings />
                    </div>
                </Tab>
                <Tab eventKey="3" title="Machine Connection">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <ConnectionSettings />
                    </div>
                </Tab>
                <Tab eventKey="4" title="User Settings">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <UserSettings />
                    </div>
                </Tab>
                <Tab eventKey="5" title="Cocktail Settings">
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <CocktailSettings />
                    </div>
                </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}

export default SettingsModal