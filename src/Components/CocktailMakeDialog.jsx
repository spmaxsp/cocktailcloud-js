import React from 'react';

import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useSocketContext } from './context/SocketContext';
import { useAppContext } from './context/AppContext';

const CocktailMakeDialog = (props) => {
    const { socket, socketService } = useSocketContext();
    const { api_ip, api_port } = useAppContext();

    const [ show, setShow ] = useState(false);

    const [ cocktail_id, setCocktail_id ] = useState("");
    const [ cocktail_name, setCocktail_name ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ status_msg, setStatusMsg ] = useState("idle");

    const [ requires_ok, setRequiresOK ] = useState(false);
    const [ dismiss_on_ok, setDismissOnOK ] = useState(false);

    const emitOK = () => {
        if (socket) {
            socketService.sendMessage('user_input_ok', 'OK');
            if (dismiss_on_ok) {
                setShow(false);
            }
        }
    }

    const emitCancel = () => {
        if (socket) {
            socketService.sendMessage('user_input_cancel', 'CANCEL');
            setShow(false);
        }
    }

    useEffect(() => {
        if (socket) {
            const handleIncomingMessage = (message) => {
                setShow(true);
                setCocktail_id(message.cocktail_id);
                setProgress(message.progress);
                setStatusMsg(message.status_msg);
                setDismissOnOK(message.dismiss_on_ok);
                setCocktail_name(message.cocktail_name);
                setRequiresOK(message.requires_ok);
            };
    
            socketService.onMessage('cocktail_state', handleIncomingMessage);
    
            // Clean up the event listener on component unmount
            return () => {
                socketService.offMessage('cocktail_state', handleIncomingMessage);
            };
        }
    }, [socket, socketService]);

    let img = `http://${api_ip}:${api_port}/image/get/cocktail/${cocktail_id}`;
    return (
        <Modal size="xs" aria-labelledby="contained-modal-title" show={show}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Making: {cocktail_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3 text-center">
                <h4 className='font-weight-bold text-danger'> &#8594; {status_msg} &#8592;</h4>
        
                {
                    requires_ok ? (
                        <Button variant="primary mb-3" onClick={() => emitOK()}>
                            OK
                        </Button>
                    ) : null
                }
                <br />

                <img src={img} className="img-fluid w-90 m-1 p-0 rounded" style={{maxHeight: "30vh"}} />
                <Container className="p-4">
                    <h5>Progress:</h5>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: progress + "%"}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => emitCancel()}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CocktailMakeDialog;