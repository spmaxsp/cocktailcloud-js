import React from 'react'

const MachineContext = React.createContext()

export const useMachineContext = () => React.useContext(MachineContext)

export const MachineContextProvider = ({ children }) => {
    const [machrequest, setMachRequest] = useState({
        mash_addr: null,
        cmd: null,
        value: null
    });

    const [machState, setMachState] = useState({
        active_cocktail: -1,   // id of the currently active cocktail
        num_steps: -1,         // number of steps of the currently active cocktail
        step_curr: -1,         // current step of the currently active cocktail
        err_state: -1,         // error state of the machine
        busy: false
    });

    
    //const refreshMachineState = () = {

    //} 

    //const requestCocktail = () = {

    //} 

    const { data, loading, error } = useApiFetch(request);

    useEffect(() => {

    }, [data])


    return (
        <MachineContext.Provider value={{ forceUpdate, setForceUpdate, api_url, setAPI_URL, options, setOptions }}>
            {children}
        </MachineContext.Provider>
    )
}

