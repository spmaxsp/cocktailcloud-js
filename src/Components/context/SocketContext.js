// src/SocketContext.js
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './AppContext';
import socketService from '../socketio/socketService';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {

    const { api_ip, api_port } = useAppContext();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (api_ip && api_port) {
        const newSocket = socketService.connect(api_ip, api_port);
        setSocket(newSocket);

        return () => {
            socketService.disconnect();
            setSocket(null);
        };
        }
    }, [api_ip, api_port]);

    return (
        <SocketContext.Provider value={{ socket, socketService }}>
            {children}
        </SocketContext.Provider>
    );
};
