import { createContext, useContext, useEffect, useState } from 'react'
import { useSettings } from '../api/settingsFetchHooks'


const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [forceUpdate, setForceUpdate] = useState(0)

    const [api_ip, setApiIp] = useState('localhost');
    const [api_port, setApiPort] = useState('43560');

    const [password, setPassword] = useState('');

    // load settings from api
    const { data, loading, error, refreshSettings, editSettings } = useSettings(api_ip, api_port);
    useEffect(() => {
        if (data && data.config && data.config.password) {
            setPassword(data.config.password);
            console.log("AppContext: ", api_ip, api_port, password);
        }
    }, [data]);

    return (
        <AppContext.Provider value={{ api_ip, setApiIp, api_port, setApiPort, password, setPassword, editSettings, refreshSettings }}>
            {children}
        </AppContext.Provider>
    )
}