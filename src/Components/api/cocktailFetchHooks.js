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
            action: 'list'
        });
    };

    const removeCocktail = (id) => {
        setRequest({
            action: 'delete',
            id: id
        });
    };
    
    const { data, loading, error } = useFetch(request, []);
    return { data, loading, error, refreshCocktails, removeCocktail };
};

const useCocktailInfo = (id) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'cocktail',
        action: 'info',
        id: id,
        value: null,
        data: {'format': 'long'}
    });

    const refreshCocktail = (id) => {
        setRequest({
            action: 'info'
        });
    }
    const editCocktail = (id, data) => {
        setRequest({
            action: 'edit',
            id: id,
            data: data
        });
    }
    const editCocktailIngredients = (id, data) => {
        setRequest({
            action: 'editIngredients',
            id: id,
            data: data
        });
    }

    const { data, loading, error } = useFetch(request, [])
    return { data, loading, error, refreshCocktail, editCocktail, editCocktailIngredients }
}

const useNewCocktail = () => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'cocktail',
        action: 'new',
        id: null,
        value: null,
        data: null
    });

    const { data, loading, error } = useFetch(request, [])
    return { data, loading, error }
}

export { useCocktailList, useCocktailInfo, useNewCocktail }

    