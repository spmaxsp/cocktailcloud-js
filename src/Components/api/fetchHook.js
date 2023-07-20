import { useState, useEffect } from 'react';

const URLlookup = (request, api_url) => {
    const { api, db, action, id, value, value2, data } = request

    let url = ``

    if ( api === 'v2') {
        url = `${api_url}/v2/${db}/${action}`
    }
    else {
        url = `${api_url}/${db}/${action}`
    }

    if (id) {
        url += `/${id}`
    }
    if (value) {
        url += `/${value}`
    }
    if (value2) {
        url += `/${value2}`
    }
    if (data) {
        url += '?'
        let isFirstParam = true
        for (const key in data) {
            if (isFirstParam) {
            isFirstParam = false
            } else {
            url += '&'
            }
            url += `${key}=${data[key]}`
        }
    }  
    console.log(url)            
    return url
}

const useFetch = (request) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api_url = 'http://localhost:43560/api'    
    
    useEffect(() => {
        setLoading(true);
        fetch(URLlookup(request, api_url))
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                setError(res.error_msg.error)
            }
            else {
                if (res.data.error) {
                    setError(res.data.error_msg)
                }
                else {
                    setError(null)
                    setData(res.data)
                }
            }
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));
    }, [request]);
    
    return { data, loading, error };
};

export default useFetch;

