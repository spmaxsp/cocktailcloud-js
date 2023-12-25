import { useApiFetch } from './fetchHook.js';
import { useState } from 'react';

const useMachineRequestState = (request) => {
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
}

const useCocktailList = () => {
    const [maschrequest, setMaschRequest] = useState({
        mash_addr: null,
        cmd: null,
        value: null,
    });

    const keep_refreshing = false;

    const [apirequest, setApiRequest] = useState({
        api: 'v2',
        db: 'settings',
        action: 'info',
        id: null,
        value: null,
        value2: null,
        data: {'format': 'long'}
    });

    //const refreshSettings = () => {
    //    setRequest({
    //        ...request,
    //        action: 'info'
    //    });
    //};

    //const refreshMachineState = () = {

    //}


    const { data, loading, error } = useFetch(request);
    const { m_data, m_loading, m_error } = useMachineRequestState();
}

export { useCocktailList, useCocktailInfo }
