import React, {useState, useEffect} from "react";
import { Modal, Button, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import AdministradoresService from "../services/AdministradoresService"; 



function Login(props) {

    const { show, handleClose} = props

    const [cedula, setCedula] = useState(null);
    const [pass, SetPass] = useState(null);

    const [admin, setAdmin] = useState(null);

    const handleOnChange = (e) =>{
        const name = e.target.name; 
        const value = e.target.value; 

        console.log(e.target);

        switch(name) {
            case "cedula": 
                setCedula(value ? value: null);
                break;
            case "pass":
                SetPass (value ? value: null);
        }
    }

    const handleGetAdmin = async () => {
        try {
            const resp = await AdministradoresService.get();
            console.log(resp);
            console.log(resp.data);
            setAdmin(resp.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const ValidarLogin = async () => {
        handleGetAdmin();                                                                               
        console.log(admin);
        if (admin != null){
            alert("Bienvenido");
        }else{
            alert(`el usuario  no existe`);
        }
    }
    



    return (
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Cedula</FormLabel>
                        <FormControl 
                            name="cedula"
                            onChange ={handleOnChange}
                            value = {cedula ? cedula: ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl 
                            name="pass"
                            onChange ={handleOnChange}
                            type = "password"
                            value = {pass ? pass: ""}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
          </Button>
                <Button variant="success" onClick = {ValidarLogin}>
                    ingresar
          </Button>
            </Modal.Footer>
        </Modal>
    );

    

}

export default Login; 