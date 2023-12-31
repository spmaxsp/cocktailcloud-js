import React from 'react'
import { useState } from 'react'

const ErrorContext = React.createContext()

export const useErrorContext = () => React.useContext(ErrorContext)

export const ErrorContextProvider = ({ children }) => {
    
    const [error_msg, setErrorMsg] = useState([]);

    const displayError = (message) => {
        const id = Date.now();
        setErrorMsg((prevErrors) => [...prevErrors, { id, message }]);

        console.log("displayError: ", error_msg);
    };
    
    const closeError = (id) => {
        setErrorMsg((prevErrors) => prevErrors.filter((error_elem) => error_elem.id !== id));
    };

    return (
        <ErrorContext.Provider value={{ error_msg, displayError, closeError }}>
            {children}
        </ErrorContext.Provider>
    )
}

