import React, {useState, useEffect} from "react";

import { Button, Container } from "react-bootstrap";

import Login from "../componets/Login";


const Inicio = () =>{


    const [show, setShow] = useState(false); 



    //metodo para cerrar 
    const handleClose = () =>{
        setShow(false); 
    }

    //metodo para abrir
    const handleOpenModal = () => {
        setShow(true);
    }

    return (
        <Container>
            <Button variant = "success" onClick = {handleOpenModal}>Login</Button>
            {
                show &&
                <Login 
                    show = {show}
                    handleClose = {handleClose}/>
                    
            }
        </Container>
    );
}

export default Inicio; 