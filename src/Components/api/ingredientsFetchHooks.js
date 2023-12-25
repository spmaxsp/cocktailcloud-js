import { useApiFetch } from './fetchHook.js';
import { useState } from 'react';

const useIngredients = () => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'ingrediant',
        action: 'list',
        id: null,
        value: null,
        value2: null,
        data: null
    });

    const refreshIngredients = () => {
        setRequest({
            ...request,
            action: 'list',
        });
    };

    const addIngredient = (name) => {
        setRequest({
            ...request,
            action: 'new',
            id: null,
            data: { 'val': name }
        });
    };

    const removeIngredient = (id) => {
        setRequest({
            ...request,
            action: 'remove',
            id: id,
            data: null
        });
    };

    const { data, loading, error } = useApiFetch(request);
    return { data, loading, error, refreshIngredients, addIngredient, removeIngredient };
};

export { useIngredients };