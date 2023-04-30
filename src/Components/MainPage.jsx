//the main ui where the cocktails card are listed in a grid (handled by Cocktail Selection). (starts with a fullscreen logo at the top, scroling down or pressing "start" scrolls to the selection located below)
import React, { useState } from 'react';

import gradient from 'random-gradient'
import Scroll from 'react-scroll'

import logo from '../assets/Cocktailcloud_Logo_SVG.svg';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';

import { APIProvider } from './api/ApiContext.js';

import CocktailSelection from './CocktailSelection'
//import SettingsModal from './SettingsMenue'


var Element  = Scroll.Element;
var scroller = Scroll.scroller;

const MainPage = () => {
    return (
        <APIProvider>
            <Navigation/>
            <Banner/>
            <Element name="ScrollToElement"></Element>
            <CocktailSelection/>
            <Footer/>
        </APIProvider>
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
            <p className="text-white display-3 mt-auto">&#8595;</p>
        </Container>
    );
}

const Footer = () => {
    return (
        <Container></Container>
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
            
        </>
    );
}

export default MainPage;

// <SettingsModal show={modalShow} onHide={() => setModalShow(false)} />

