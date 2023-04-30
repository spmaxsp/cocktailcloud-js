import * as React from 'react'
import { useEffect } from 'react'

import produce from "immer";

const APIContext = React.createContext()

export const useAPI = () => React.useContext(APIContext)

export const APIProvider = ({ children }) => {
    const [cocktails, setCocktails] = React.useState({status: 'init', content: {}})
    const [cocktailIDs, setCocktailIDs] = React.useState({status: 'init', content: []})
    const [newCocktail, setNewCocktail] = React.useState({status: 'init', content: null})

    const [users, setUsers] = React.useState({status: 'init', content: {}})
    const [userIDs, setUserIDs] = React.useState({status: 'init', content: []})
    const [newUser, setNewUser] = React.useState({status: 'init', content: null})

    const [ingrediants, setIngrediants] = React.useState({status: 'init', content: {}})

    const [config, setConfig] = React.useState({status: 'init', content: {}})

    const [errors, setErrors] = React.useState([])

    const APICall = (request) => {
        
        const SetState = (request, state) => {
            if (request.db === 'cocktail') {
                if (request.action === 'list') {
                    setCocktailIDs(prev => ({...prev, status:state}))
                }
                else if (request.action === 'info') {
                    setCocktails(produce(cocktails, draft => {
                        draft.status = state
                    }
                    ))
                }
                else if (request.action === 'new') {
                    setNewCocktail(prev => ({...prev, status:state}))
                }
            }
            else if (request.db === 'users') {
                if (request.action === 'list') {
                    let copy = userIDs
                    copy.status = state
                    setUserIDs(copy)
                }
                else if (request.action === 'info') {
                    let copy = users
                    copy[request.id].status = state
                    setUsers(copy)
                }
                else if (request.action === 'new') {
                    let copy = newUser
                    copy.status = state
                    setNewUser(copy)
                }
            }
            else if (request.db === 'ingrediant') {
                let copy = ingrediants
                copy.status = state
                setIngrediants(copy)
            }
            else if (request.db === 'settings') {
                let copy = config
                copy.status = state
                setConfig(copy)
            }
        }

        const SetData = (request, data) => {
            if (request.db === 'cocktail') {
                if ('cocktails' in data) {
                    setCocktailIDs(prev => ({...prev, content:data.cocktails}))
                }
                else if ('cocktail' in data) {
                    setCocktails(produce(cocktails, draft => {
                        draft.content[request.id] = JSON.parse(JSON.stringify(data.cocktail))
                    }
                    ))
                }
                else if ('new_id' in data) {
                    setNewCocktail(prev => ({...prev, content:data.new_id}))
                }
            }
            else if (request.db === 'users') {
                if ('users' in data) {
                    setUserIDs(prev => ({...prev, content:data.users}))
                }
                else if ('user' in data) {
                    setUsers(prev => ({...prev, [request.id]:{status:'ok', content:data.user}}))
                }
                else if ('new_id' in data) {
                    setNewUser(prev => ({...prev, content:data.new_id}))
                }
            }
            else if (request.db === 'ingrediant') {
                if ('ingrediants' in data) {
                    setIngrediants(prev => ({...prev, content:data.ingrediants}))
                }
            }
            else if (request.db === 'settings') {
                if ('config' in data) {
                    setConfig(prev => ({...prev, content:data.config}))
                }
            }
        }

        const APIfetch = (request) => {
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

            const api_url = 'http://localhost:43560'
            const url = URLlookup(request, api_url)
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            SetState(request, 'loading')

            fetch(url, options)
                .then(res => res.json())
                .then(response => {
                    if (response.error) {
                        setErrors(prev => [...prev, response.error_msg.error])
                        SetState(request, 'error')
                    }
                    else {
                        const data = response.data
                        SetData(request, data)
                        SetState(request, 'ok')
                    }
                })
                .catch(error => {
                    console.log(error)
                    setErrors(prev => [...prev, error])
                    SetState(request, 'error')
                })  

        }

        APIfetch(request)
    }

    const fetchCocktails = () => {
        const request = {
            'db': 'cocktail',
            'action': 'list',
            'id': null,
            'value': null,
            'data': null
        }
        APICall(request)
    }

    const fetchIngrediants = () => {
        const request = {
            'db': 'ingrediant',
            'action': 'list',
            'id': null,
            'value': null,
            'data': null
        }
        APICall(request)
    }

    const fetchUsers = () => {
        const request = {
            'db': 'users',
            'action': 'list',
            'id': null,
            'value': null,
            'data': null
        }
        APICall(request)
    }

    const fetchConfig = () => {
        const request = {
            'db': 'settings',
            'action': 'info',
            'id': null,
            'value': null,
            'data': null
        }
        APICall(request)
    }

    useEffect(() => {
        for (const id of cocktailIDs.content) {
                if (!(id in cocktails)) {
                    if (cocktails.status !== 'loading') {
                        APICall({
                            'db': 'cocktail',
                            'action': 'info',
                            'id': id,
                            'value': null,
                            'data': null
                        })
                        break
                    }
                }
                
        }
    }, [cocktailIDs.content])

    useEffect(() => {
        for (const id of cocktailIDs.content) {
            if (!(id in cocktails)) {
                    if (cocktails.status !== 'loading') {
                        APICall({
                            'db': 'cocktail',
                            'action': 'info',
                            'id': id,
                            'value': null,
                            'data': null
                        })
                        
                    }
                }
                
        }
    }, [cocktails])


    const value = { cocktails, ingrediants, users, config,  fetchCocktails, fetchIngrediants, fetchUsers, fetchConfig }

    return <APIContext.Provider value={value}>{children}</APIContext.Provider>

}

