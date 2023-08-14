// UI: (popup) from where the cocktails can be edited (a dropdown at the top lists all available cocktails)
import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';


import { useCocktailList } from './api/cocktailFetchHooks';
import { useCocktailInfo } from './api/cocktailFetchHooks';

import { useState , useEffect } from 'react';

const CocktailSettings = (props) => {

    const { data, loading, error, refreshCocktails, removeCocktail, addCocktail} = useCocktailList();

    const renderEntry = (id) => {
        return (
            <CocktailEditor key={id} id={id} delete_func={removeCocktail} />
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
                <h4>Edit Cocktails</h4>
                <Card body>
                    <ListGroup variant="flush">
                        {
                            data.cocktails.map(renderEntry)
                        }
                    </ListGroup>
                </Card>
                <br />
                <h4>Add Cocktail</h4>
                <Form.Control type="button" value="Add New" variant="danger" onClick={() => addCocktail()} />
            </>
        )
    }
}

const CocktailEditor = (props) => {
    const { data, loading, error, refreshCocktail, editCocktailname, editCocktaillikes, addCocktailIngredients, removeCocktailIngredients, editCocktailIngredients } = useCocktailInfo(props.id);

    const [add_optn, setAdd_optn] = useState('');
    const [coktail_name, setCocktail_name] = useState('');

    useEffect(() => {
        if (data && data.cocktail && data.cocktail.name) {
            setCocktail_name(data.cocktail.name);
        }
    }, [data]);

    const onChangeName = () => {
        console.log(coktail_name);
        if (coktail_name !== '') {
            editCocktailname(coktail_name);
        }
    }

    const onChangeAmount = (e, id, priority) => {
        let new_optn = e.target.value;
        if (new_optn !== '' && !Number.isNaN(new_optn)) {
            editCocktailIngredients(id, new_optn, priority);
        }	
    }

    const onChangePriority = (e, id, amount) => {
        let new_optn = e.target.value;
        if (new_optn !== '' && !Number.isNaN(new_optn)) {
            editCocktailIngredients(id, amount, new_optn);
        }
    }

    const addIngredient = () => {
        if (add_optn !== '') {
            let all_used_ingredients = Object.keys(data.cocktail.recepie).map((key) => (data.cocktail.recepie[key]["id"]));
            if (!all_used_ingredients.includes(add_optn)) {
                addCocktailIngredients(add_optn, 100, 0);
            }	
        }
    }

    const [show, setShow] = useState(props.show_new == props.id);

    if (!data) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    }
    else{
        let cocktail = data.cocktail;

        console.log(cocktail);
        
        return (
            <>
                <ListGroup.Item variant="flush">
                    <Form.Control type="button" value={cocktail.name} onClick={() => setShow(true)} />
                </ListGroup.Item>
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" >
                    <Modal.Header closeButton>
                        <Modal.Title>{cocktail.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Name</h4>
                        <Form.Control type="text" value={coktail_name} onChange={(e) => setCocktail_name(e.target.value)}/>
                        <Form.Control type="button" value="Save" variant="primary" onClick={() => onChangeName()}/>
                        
                        <h4>Ingredients</h4>
                        <ListGroup variant="flush">
                            {
                                Object.keys(cocktail.recepie).map((key) => (
                                    <ListGroup.Item>
                                        <h6>{key}:</h6>
                                        <Form.Control type="number" value={cocktail.recepie[key]["amount"]} onChange={(e) => onChangeAmount(e, cocktail.recepie[key]["id"], cocktail.recepie[key]["priority"])}/>
                                        <Form.Control type="number" value={cocktail.recepie[key]["priority"]} onChange={(e) => onChangePriority(e, cocktail.recepie[key]["id"], cocktail.recepie[key]["amount"])}/>
                                        <Form.Control type="button" value="Remove" variant="danger" onClick={() => removeCocktailIngredients(cocktail.recepie[key]["id"])}/>
                                    </ListGroup.Item>
                                ))
                            }
                            <ListGroup.Item>
                                <Form.Select onChange={(e) => setAdd_optn(e.target.value)}>
                                    <option value="">Select an ingredient</option>
                                    {
                                        Object.keys(cocktail.available).map((key) => (
                                            <option value={key}>{cocktail.available[key]}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control type="button" value="Add" variant="primary" onClick={() => addIngredient()} />
                            </ListGroup.Item>
                        </ListGroup>

                        <h4>Remove</h4>
                        <Form.Control type="button" value="Remove" variant="danger" onClick={() => props.delete_func(props.id)}/>
                    </Modal.Body>  
                </Modal>
            </>
        )
    }
}

export default CocktailSettings;

