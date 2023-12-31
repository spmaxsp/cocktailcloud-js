// UI: (popup) from where users can be added and deleted (a dropdown at the top lists all users to make changes)

// UI: (popup) from where the cocktails can be edited (a dropdown at the top lists all available cocktails)
import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import { useState , useEffect } from 'react';

import { useUserList } from './api/userFetchHooks';
import { useUserInfo } from './api/userFetchHooks';

import { useAppContext } from './context/AppContext.js'; 


const UserSettings = (props) => {

    const { api_ip, api_port } = useAppContext();
    const { data, loading, error, refreshUser, removeUser, addUser} = useUserList(api_ip, api_port);

    const renderEntry = (id) => {
        return (
            <UserEditor key={id} id={id} delete_func={removeUser} show_new={data.new_id} />
        )
    }

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        return (
            <>
                <h4>Edit Users</h4>
                <Card body>
                    <ListGroup variant="flush">
                        {
                            data.users.map(renderEntry)
                        }
                    </ListGroup>
                </Card>
                <br />
                <h4>Add User</h4>
                <Form.Control type="button" value="Add New" variant="danger" onClick={() => addUser()} />
            </>
        )
    }
}

const UserEditor = (props) => {

    const { api_ip, api_port } = useAppContext();
    const { data, loading, error, refreshUser, editUsername, editUserfield } = useUserInfo(props.id, api_ip, api_port);

    const [user_name, setUser_name] = useState('');
    const [user_drinks, setUser_drinks] = useState(0);
    const [user_age, setUser_age] = useState(0);
    const [user_gender, setUser_gender] = useState('');
    const [user_weight, setUser_weight] = useState('');
    const [user_attrib, setUser_attrib] = useState('');

    useEffect(() => {
        if (data) {
            setUser_name(data.user.name);
            setUser_drinks(data.user.drinks);
            setUser_age(data.user.age);
            setUser_gender(data.user.gender);
            setUser_weight(data.user.weight);
            setUser_attrib(data.user.attrib);
        }
    }, [data]);

    const SaveName = () => {
        editUsername(user_name);
    }

    const ResetDrinks = () => {
        editUserfield('drinks', 0);
    }

    const OnAgeChange = (e) => {
        let new_optn = e.target.value;
        if (new_optn !== '' && !Number.isNaN(new_optn)) {
            editUserfield('age', new_optn);
        }
    }

    const OnGenderChange = (e) => {
        let new_optn = e.target.value;
        if (new_optn !== '' && !Number.isNaN(new_optn)) {
            editUserfield('gender', new_optn);
        }
    }

    const OnWeightChange = (e) => {
        let new_optn = e.target.value;
        if (new_optn !== '' && !Number.isNaN(new_optn)) {
            editUserfield('weight', new_optn);
        }
    }

    const ResetAttrib = () => {
        editUserfield('attrib', '');
    }

    const [show, setShow] = useState(props.show_new == props.id);

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{

        let user = data.user;

        console.log(user);
        
        return (
            <>
                <ListGroup.Item variant="flush">
                    <Form.Control type="button" value={user.name} onClick={() => setShow(true)} />
                </ListGroup.Item>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{user.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={user_name} onChange={(event) => setUser_name(event.target.value)} />
                                <Form.Control type="button" value="Apply" variant="primary" onClick={() => SaveName()} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Drinks</Form.Label>
                                <Form.Control type="text" value={user_drinks} readOnly />
                                <Form.Control type="button" value="Reset" variant="danger" onClick={() => ResetDrinks()} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="text" value={user_age} onChange={OnAgeChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Control type="text" value={user_gender} onChange={OnGenderChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="text" value={user_weight} onChange={OnWeightChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Attrib</Form.Label>
                                <Form.Control type="text" value={user_attrib} readOnly />
                                <Form.Control type="button" value="Reset" variant="danger" onClick={() => ResetAttrib()} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Control type="button" value="Close" variant="primary" onClick={() => {setShow(false); }} />
                        <Form.Control type="button" value="Delete" variant="danger" onClick={() => props.delete_func(props.id)} />
                    </Modal.Footer>
                </Modal>
            </>                
        )
    }
}

export default UserSettings;