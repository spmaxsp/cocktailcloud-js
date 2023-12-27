import { useApiFetch } from './fetchHook.js';
import { useState, useEffect } from 'react';

const useUserList = (api_ip, api_port, displayError) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'user',
        action: 'list',
        id: null,
        value: null,
        value2: null,
        data: null
    });

    const refreshUser = () => {
        setRequest({
            ...request,
            action: 'list',
            id: null,
            value: null,
            value2: null,
            data: null
        });
    };

    const removeUser = (id) => {
        setRequest({
            ...request,
            action: 'remove',
            id: id,
            value: null,
            value2: null,
            data: null
        });
    };

    const addUser = () => {
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

    return { data, loading, error, refreshUser, removeUser, addUser};
};

const useUserInfo = (id, api_ip, api_port, displayError) => {
    const [request, setRequest] = useState({
        api: 'v2',
        db: 'user',
        action: 'info',
        id: id,
        value: null,
        value2: null
    });

    const refreshUser = () => {
        setRequest({
            ...request,
            action: 'info',
            id: null,
            value: null,
            value2: null
        });
    }
    const editUsername = (data) => {
        setRequest({
            ...request,
            action: 'edit',
            value: 'name',
            value2: null,
            data: {'val':data }
        });
    }
    const editUserfield = (field, data) => {
        if (field === 'drinks' || field === 'age' || field === 'gender' || field === 'weight' || field === 'attrib') {
            setRequest({
                ...request,
                action: 'edit',
                value: field,
                value2: null,
                data: {'val':data }
            });
        }
    }   

    const { data, loading, error } = useApiFetch(request, api_ip, api_port)

    useEffect(() => {
        if (error) {
            displayError(error.message);
        }
    }, [error]);

    return { data, loading, error, refreshUser, editUsername, editUserfield };
};

export { useUserList, useUserInfo }
