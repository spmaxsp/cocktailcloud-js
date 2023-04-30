import React from 'react'

const APIContext = React.createContext()

export const useAPI = () => React.useContext(APIContext)

export const APIProvider = ({ children }) => {
    const [forceUpdate, setForceUpdate] = React.useState(0)
    const [api_url, setAPI_URL] = React.useState('http://localhost:43560')
    const [options, setOptions] = React.useState({
                                                    method: 'GET',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    }
                                                    })

    return (
        <APIContext.Provider value={{ forceUpdate, setForceUpdate, api_url, setAPI_URL, options, setOptions }}>
            {children}
        </APIContext.Provider>
    )
}