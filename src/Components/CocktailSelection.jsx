//lists the cocktails cards (Cocktial Card) in a grid (sortable?)
import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CocktailCard from './CocktailCard'

import { useCocktailList } from './api/cocktailFetchHooks';

import { useAppContext } from './context/AppContext.js'; 


const CocktailSelection = (props) => {

    const { api_ip, api_port } = useAppContext();
    const { data, loading, error, refreshCocktails, removeCocktail, addCocktail} = useCocktailList(api_ip, api_port);
    
    const renderCard = (id) => {
        console.log(id);
        return <CocktailCard key={id} id={id} />;
    }

    if (loading || !data) {
        return <div>Loading...</div>;
    }
    else{
        return(
            <Container className='pt-4 pb-5'>
                <Button onClick={refreshCocktails}>Refresh</Button>
                <Container>
                    <Row pb={4}>
                        {data.cocktails.map(renderCard)}
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default CocktailSelection;




