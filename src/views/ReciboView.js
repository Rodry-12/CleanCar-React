import React,{useState} from "react";
import ReciboModal from '../componets/ReciboModal';
import {Container,Button} from 'react-bootstrap';

function ReciboView () {

    const [show, setShow] = useState(false);

    //metodo para cerrar 
    const handleClose = () => {
        setShow(false);
    }

    //metodo para abrir
    const handleOpenModal = () => {
        setShow(true);
    }
   return (
        <Container>
            <p></p>
            <p></p>
            <Button variant="success" size="lg" onClick = {handleOpenModal}>Crear un Recibo</Button>
            {
                show &&
                <ReciboModal 
                show = {show} 
                handleClose = {handleClose}
                />
            }
        </Container>

    );

}

export default ReciboView; 