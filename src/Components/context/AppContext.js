import React from 'react'
import { useSettings } from '../api/settingsFetchHooks'

const AppContext = React.createContext()

export const useAppContext = () => React.useContext(AppContext)

export const AppContextProvider = ({ children }) => {
    const [forceUpdate, setForceUpdate] = React.useState(0)

    const { data, loading, error, refreshSettings, editSettings, addManualIngredient, removeManualIngredient, editPump } = useSettings();

    React.useEffect(() => {
        if (data) {
            console.log( "AppContextProvider: data changed" + JSON.stringify(data))
        }
    }, [data])




    return (
        <AppContext.Provider value={{ data, forceUpdate }}>
            {children}
        </AppContext.Provider>
    )
}