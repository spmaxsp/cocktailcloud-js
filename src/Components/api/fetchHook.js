import { useState, useEffect } from 'react';

const ApiURLlookup = (request, api_url) => {
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
    //console.log(url)            
    return url
}

const MachURLlookup = (request, mach_url) => {
    const {  } = request

    let url = ``

    //console.log(url)            
    return url
}


const useMachineRequest = (request) => {
    const mach_url = 'http://localhost:43560/api'

    const { data, loading, error } = useFetch(MachURLlookup(request, mach_url));
    return { data, loading, error };
}

const useApiFetch = (request, api_ip, api_port) => {

    const api_url = 'http://' + api_ip + ':' + api_port + '/api'

    useEffect(() => {
        console.log("api url: ", api_url)
    }, [api_ip, api_port]);

    const { data, loading, error } = useFetch(ApiURLlookup(request, api_url));
    return { data, loading, error };
}

const useFetch = (request_url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    
    useEffect(() => {
        console.log("Running Fetch-Request: ", request_url)

        setLoading(true);
        fetch(request_url)
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                let error_str = "Error in API: " + res.error_msg + " [" + request_url + "]"
                setError({message: error_str})
            }
            else {
                if (res.data) {
                    setError(null)
                    setData(res.data)
                }
                else {
                    let error_str = "Error in Fetch-Request: No data returned [" + request_url + "]"
                    setError({message: error_str})
                }
            }
        })
        .catch((err) => { 
            let error_str = "Error in Fetch-Request: " + err.message + " [" + request_url + "]"
            setError({message: error_str})
        })
        .finally(() => setLoading(false));
    }, [request_url]);
    
    return { data, loading, error };
};

export { useApiFetch, useMachineRequest };


