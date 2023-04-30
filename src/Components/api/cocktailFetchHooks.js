import useFetch from './fetchHook.js';
import { useState } from 'react';

const useCocktailList = () => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'cocktail',
        action: 'list',
        id: null,
        value: null,
        data: null
    });

    const refreshCocktails = () => {
        setRequest({
            api: 'v2',
            db: 'cocktail',
            action: 'list'
        });
    };

    const removeCocktail = (id) => {
        setRequest({
            api: 'v2',
            db: 'cocktail',
            action: 'delete',
            id: id
        });
    };
    
    const { data, loading, error } = useFetch(request, []);
    return { data, loading, error, refreshCocktails, removeCocktail };
};

const useCocktailInfo = (id) => {
    var request = {
        api: 'v2',
        db: 'cocktail',
        action: 'info',
        id: id
    }
    const refreshCocktail = (id) => {
        request = {
            api: 'v2',
            db: 'cocktail',
            action: 'info',
            id: id
        }
    }
    const editCocktail = (id, data) => {
        request = {
            api: 'v2',
            db: 'cocktail',
            action: 'edit',
            id: id,
            data: data
        }
    }
    const editCocktailIngredients = (id, data) => {
        request = {
            api: 'v2',
            db: 'cocktail',
            action: 'edit',
            id: id,
            data: data
        }
    }

    const { data, loading, error } = useFetch(request, [])
    return { data, loading, error, refreshCocktail, editCocktail, editCocktailIngredients }
}

const useNewCocktail = () => {
    const request = {
        api: 'v2',
        db: 'cocktail',
        action: 'new'
    }

    const { data, loading, error } = useFetch(request, [])
    return { data, loading, error }
}

export { useCocktailList, useCocktailInfo, useNewCocktail }

    