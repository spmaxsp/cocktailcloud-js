import { createContext, useContext, useEffect, useState } from 'react'
import { useSettings } from '../api/settingsFetchHooks'


const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [forceUpdate, setForceUpdate] = useState(0)

    const [api_ip, setApiIp] = useState('localhost');
    const [api_port, setApiPort] = useState('43560');
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');

    const [password, setPassword] = useState('');

    const [error_msg, setErrorMsg] = useState(['Some Test', 'Another Test Error Message']);


    const { data, loading, error, refreshSettings, editSettings } = useSettings();


    useEffect(() => {
        if (data && data.config && data.config.password) {
            setApiIp(data.config.api_ip);
            setApiPort(data.config.api_port);
            setIp(data.config.machine_ip);
            setPort(data.config.machine_port);

            setPassword(data.config.password);

            console.log("AppContext: ", api_ip, api_port, ip, port, password);
        }
    }, [data]);


    const displayError = (message) => {
        const id = Date.now();
        setErrorMsg((prevErrors) => [...prevErrors, { id, message }]);

        console.log("displayError: ", error_msg);
    };
    
    const closeError = (id) => {
        setErrorMsg((prevErrors) => prevErrors.filter((error_elem) => error_elem.id !== id));
    };


    return (
        <AppContext.Provider value={{ error_msg, api_ip, setApiIp, api_port, setApiPort, ip, setIp, port, setPort, password, setPassword, editSettings, refreshSettings, closeError, displayError }}>
            {children}
        </AppContext.Provider>
    )
}