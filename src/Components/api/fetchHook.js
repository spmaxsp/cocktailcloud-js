import { useState, useEffect } from 'react';

const URLlookup = (request, api_url) => {
    const { db, action, id, value, data } = request
    let url = `${api_url}/${db}/${action}`
    if (id) {
        url += `/${id}`
    }
    if (value) {
        url += `/${value}`
    }
    if (data) {
        url += '?'
        data.forEach((item, index) => {
            url += `${item.key}=${item.value}`
            if (index < data.length - 1) {
                url += '&'
            }
        })
    }   
    console.log(url)            
    return url
}

const useFetch = (request, initialData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api_url = 'http://localhost:43560'    
    
    useEffect(() => {
        setLoading(true);
        fetch(URLlookup(request, api_url))
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                setError(res.error_msg.error)
            }
            else {
                setData(res.data)
            }
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));
    }, []);
    
    return { data, loading, error };
};

export default useFetch;

