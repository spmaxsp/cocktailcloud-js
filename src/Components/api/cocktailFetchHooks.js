import { useApiFetch } from './fetchHook.js';
import { useState, useEffect } from 'react';

const useCocktailList = (api_ip, api_port, displayError) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'cocktail',
        action: 'list',
        id: null,
        value: null,
        value2: null,
        data: null
    });

    const refreshCocktails = () => {
        setRequest({
            ...request,
            action: 'list',
            id: null,
            value: null,
            value2: null,
            data: null
        });
    };

    const removeCocktail = (id) => {
        setRequest({
            ...request,
            action: 'remove',
            id: id,
            value: null,
            value2: null,
            data: null
        });
    };

    const addCocktail = () => {
        setRequest({
            ...request,
            action: 'new',
            id: null,
            value: null,
            value2: null,
            data: null
        });
    };
    
    const { data, loading, error } = useApiFetch(request, api_ip, api_port);

    useEffect(() => {
        if (error) {
            displayError(error.message);
        }
    }, [error]);

    return { data, loading, error, refreshCocktails, removeCocktail, addCocktail};
};

const useCocktailInfo = (id, api_ip, api_port, displayError) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'cocktail',
        action: 'info',
        id: id,
        value: null,
        value2: null,
        data: {'format': 'long'}
    });

    const refreshCocktail = () => {
        setRequest({
            ...request,
            action: 'info',
            id: null,
            value: null,
            value2: null,
            data: {'format': 'long'}
        });
    }
    const editCocktailname = (data) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'name',
            value2: null,
            data: {'val':data, 'format': 'long'}
        });
    }

    const editCocktaillikes = (data) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'likes',
            data: {'val':data, 'format': 'long'}
        });
    }

    const addCocktailIngredients = (ingredient, amount, priority) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'ingrediants',
            value2: ingredient,
            data: {'amount':amount, 'priority':priority, 'format': 'long'}
        });
    }

    const removeCocktailIngredients = (ingredient) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'ingrediants',
            value2: ingredient,
            data: {'amount':0, 'priority':0, 'format': 'long'}
        });
    }

    const editCocktailIngredients = (ingredient, amount, priority) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'ingrediants',
            value2: ingredient,
            data: {'amount':amount, 'priority':priority, 'format': 'long'}
        });
    }

    const { data, loading, error } = useApiFetch(request, api_ip, api_port);

    useEffect(() => {
        if (error) {
            displayError(error.message);
        }
    }, [error]);

    return { data, loading, error, refreshCocktail, editCocktailname, editCocktaillikes, addCocktailIngredients, removeCocktailIngredients, editCocktailIngredients }
}

export { useCocktailList, useCocktailInfo }
