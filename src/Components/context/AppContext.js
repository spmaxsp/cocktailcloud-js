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


    const { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump } = useSettings();


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


    return (
        <AppContext.Provider value={{ api_ip, setApiIp, api_port, setApiPort, ip, setIp, port, setPort, password, setPassword, editSettings, refreshSettings }}>
            {children}
        </AppContext.Provider>
    )
}