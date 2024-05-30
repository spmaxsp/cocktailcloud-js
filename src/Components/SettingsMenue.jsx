//UI: (modal) a simple settings menue

import React from 'react';

import Modal from 'react-bootstrap/Modal';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Card, Container, Form, ListGroup } from 'react-bootstrap';

import { useState, useEffect } from 'react'

import ConfigurationSettings from './ConfigurationSettings'
import CocktailSettings from './CocktailSettings'
import UserSettings from './UserSettings'

import { useIngredients } from './api/ingredientsFetchHooks';

import { useAppContext } from './context/AppContext.js';


const GlobalSettings = () => {
    const { password, setPassword, editSettings } = useAppContext();

    const [ password2, setPassword2 ] = useState('');

    const savePassword = () => {
        if (password2 != '') {
            editSettings('password', password2);
        }
    }

    const applyPassword = () => {
        if (password2 != '') {
            setPassword(password2);
        }
    }

    useEffect(() => {
        setPassword2(password);
    }, [password]);

    return (
        <>
            <h4>Global Settings</h4>
            <Form.Group>
                <Form.Label>Pin Number</Form.Label>
                <Form.Control type="number" value={password2} onChange={(event) => setPassword2(event.target.value)} />
                <Form.Control type="button" value="Apply" variant="danger" onClick={() => savePassword()} />
                <Form.Control type="button" value="Save" variant="danger" onClick={() => savePassword()} />
            </Form.Group>
        </>
    )
}

const IngredientSettings = () => {

    const { api_ip, api_port } = useAppContext();
    const { data, loading, error, refreshIngredients, addIngredient, removeIngredient } = useIngredients(api_ip, api_port);

    const [new_ingredient, setNew_ingredient] = useState('');

    if (loading || !data) {
        return <div>Loading...</div>;
    }
    else{
        return (
            <>
                <h4>Add Ingredients</h4>
                <Form.Group>
                    <Form.Control type="text" value={new_ingredient} onChange={(event) => setNew_ingredient(event.target.value)} />
                    <Form.Control type="button" value="Add" variant="danger" onClick={() => addIngredient(new_ingredient)} />
                </Form.Group>
                <h4>Remove Ingredients</h4>
                <Card body>
                    <ListGroup variant="flush">
                        {
                            Object.keys(data.ingrediants).map((key) => (
                                <ListGroup.Item key={key}>
                                    <Form.Control type="button" value={data.ingrediants[key]} variant="danger" onClick={() => removeIngredient(key)} />
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Card>
            </>
        )
    }
}

const ConnectionSettings = () => {
    const { api_ip, setApiIp, api_port, setApiPort, editSettings, refreshSettings } = useAppContext();

    const [api_ip2, setApiIp2] = useState('');
    const [api_port2, setApiPort2] = useState('');

    const saveApi = () => {
        if (api_ip2 != '') {
            editSettings('api_ip', api_ip2);
        }
        if (api_port2 != '') {
            editSettings('api_port', api_port2);
        }
    }

    const applyApi = () => {
        if (api_ip2 != '') {
            setApiIp(api_ip2);
        }
        if (api_port2 != '') {
            setApiPort(api_port2);
        }
    }

    useEffect(() => {
        setApiIp2(api_ip);
        setApiPort2(api_port);
    }, [api_ip, api_port]);

    return (
        <>
            <h4>IP Settings</h4>
            <Card body>
                <Form.Group>
                    <Form.Label>Api IP</Form.Label>
                    <Form.Control type="text" value={api_ip2} onChange={(event) => setApiIp2(event.target.value)} />
                    <Form.Label>Api Port</Form.Label>
                    <Form.Control type="number" value={api_port2} onChange={(event) => setApiPort2(event.target.value)} />
                    <Form.Control type="button" value="Apply" variant="danger" onClick={() => applyApi()} />
                    <Form.Control type="button" value="Save" variant="danger" onClick={() => saveApi()} />
                </Form.Group>
            </Card>
        </>
    )
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
                <Tab eventKey="3" title="API Connection">
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