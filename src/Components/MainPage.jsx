//the main ui where the cocktails card are listed in a grid (handled by Cocktail Selection). (starts with a fullscreen logo at the top, scroling down or pressing "start" scrolls to the selection located below)
import React, { useState, useEffect } from 'react';

import gradient from 'random-gradient'
import Scroll from 'react-scroll'

import logo from '../assets/Cocktailcloud_Logo_SVG.svg';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.css';

import { AppContextProvider } from './context/AppContext.js';
import { ErrorContextProvider } from './context/ErrorContext.js';
import { SocketContextProvider } from './context/SocketContext.js';

import { useErrorContext } from './context/ErrorContext.js';
import { useSocketContext } from './context/SocketContext.js';

import CocktailSelection from './CocktailSelection'
import SettingsModal from './SettingsMenue'
import CocktailMakeDialog from './CocktailMakeDialog'


var Element  = Scroll.Element;
var scroller = Scroll.scroller;

const MainPage = () => {
    return (
        <ErrorContextProvider>
            <AppContextProvider>
                <SocketContextProvider>
                    <Navigation/>
                    <Banner/>
                    <Element name="ScrollToElement"></Element>
                    <CocktailSelection/>
                    <Footer/>
                    <MachineStatus_Banner/>
                    <CocktailMakeDialog/>
                </SocketContextProvider>
            </AppContextProvider>
            <ErrorBanner/>
        </ErrorContextProvider>
    );
}

const Banner = () => {
    const randomstring = Math.random().toString(36).substring(2,7);
    const gGradient = { background: gradient(randomstring) }

    return (
        <Container fluid className="vh-100 d-flex align-items-center flex-column p-5" style={gGradient}>
            <h1 className="text-white display-1">Cocktail Cloud</h1>
            <div className="h-25 d-inline-block w-20 my-5">
                <img className="mb-5 h-100" src={logo} alt="..." />
            </div>
            <Button variant="outline-light"
                    onClick={() => scroller.scrollTo('ScrollToElement', {duration: 1000,
                                                                            delay: 10,
                                                                            smooth: true})
                            }>
                Start ordering...
            </Button>
            <p className="text-white display-3 ">&#8595;</p>
        </Container>
    );
}

const Footer = () => {
    return (
        <Container></Container>
    );
}

const MachineStatus_Banner = () => {

    const { socket, socketService } = useSocketContext();
    const [ status, setStatus ] = useState("no API connection");

    useEffect(() => {
        if (socket) {
            const handleIncomingMessage = (message) => {
                setStatus(message)
            };
    
            socketService.onMessage('machine_state', handleIncomingMessage);
        
            // Clean up the event listener on component unmount
            return () => {
                socketService.offMessage('message', handleIncomingMessage);
            };
        }
        else {
            setStatus("no API connection");
        }
    }, [socket, socketService]);

    const getStatusColor = () => {
        switch (status) {
            case "machine offline":
                return "bg-danger";
            case "machine online":
                return "bg-success";
            default:
                return "bg-info";
        }
    };

    return (
        <Container fluid className={`${getStatusColor()} text-white text-center fixed-bottom`}>
            Machine Status: {status}
        </Container>
    );
}

const ErrorMessage = ({ message, close_func }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            close_func();
        }, 5000);
    
        return () => {
            clearTimeout(timer);
        };
    }, [close_func]);

    return (
        <Alert variant="danger" onClose={() => close_func()} dismissible>
            <p>{message}</p>
        </Alert>
    );
};

const ErrorBanner = () => {
    const { error_msg, closeError } = useErrorContext();

    return (
        <Container style={{position: "fixed", top: "0", width: "100%", zIndex: "1000"}}>
            {
                error_msg.map((error) => (
                    <ErrorMessage key={error.id} message={error.message} close_func={() => closeError(error.id)} />
                ))
            }
        </Container>
    );
    
}

const Navigation = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Container fluid>
                            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                            Cocktail Cloud
                        </Container>
                    </Navbar.Brand>
                    <Button variant="outline-light" onClick={() => setModalShow(true)}>Settings</Button>
                </Container>
            </Navbar>

            <SettingsModal show={modalShow} onHide={() => setModalShow(false)} />
            
        </>
    );
}

export default MainPage;

