import { useApiFetch } from './fetchHook.js';
import { useState } from 'react';

const useSettings = (api_ip, api_port) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'settings',
        action: 'info',
        id: null,
        value: null,
        value2: null,
        data: {'format': 'long'}
    });

    const refreshSettings = () => {
        setRequest({
            ...request,
            action: 'info'
        });
    };

    const editSettings = (entry, val) => {
        setRequest({
            ...request,
            action: 'edit',
            id: 'machine',
            value: entry,
            data: {'val':val, 'format': 'long'}
        });
    };

    const addManualIngredient = (id) => {
        setRequest({
            ...request,
            action: 'edit',
            id: 'manual',
            value: 'add',
            data: {'val':id, 'format': 'long'}
        });
    };

    const removeManualIngredient = (id) => {
        setRequest({
            ...request,
            action: 'edit',
            id: 'manual',
            value: 'remove',
            data: {'val':id, 'format': 'long'}
        });
    };

    const editPump = (pump, ingredient) => {
        setRequest({
            ...request,
            action: 'edit',
            id: 'pump',
            value: pump,
            data: {'val':ingredient, 'format': 'long'}
        });
    };

    const { data, loading, error } = useApiFetch(request, api_ip, api_port);
    return { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump };
};

export { useSettings }