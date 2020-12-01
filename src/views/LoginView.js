import React, { useState } from "react";

import { Container, Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";

import "../styles/login.css"
import AdministradoresService from "../services/AdministradoresService";

import Swal from 'sweetalert2';


function LoginView() {


    const [cedulaAdmin, setCedulaAdmin] = useState(null);
    const [password, setPassword] = useState(null);

    
    const handleAuth = async  () => {
        try {
            const resp = await AdministradoresService.auth({
                cedulaAdmin,
                password
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 2000
              })
            console.log(resp);
        } catch (error) {
            Swal.fire({
                title: "Cedula o contraseña incorrecta",
                icon: "error",
            })
            console.log(error);
        }

    }
    

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(e.target);

        switch (name) {
            case "cedula": 
                setCedulaAdmin(value ? value: null);
                break; 
            case "contraseña":
                setPassword(value ? value: null);
                break; 
        }
    }

    return (
        <Container className="containerLogin">
            <Form>
                <FormGroup>
                    <FormLabel>Cedula</FormLabel>
                    <FormControl

                        name ="cedula"
                        placeholder="Cedula Administrador"
                        onChange = {handleOnChange}
                        value={cedulaAdmin ? cedulaAdmin : null}>

                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        name ="contraseña"
                        placeholder="Contraseña" type="password"
                        onChange = {handleOnChange}
                        value={password ? password : null}>
                    </FormControl>
                </FormGroup>

                <Button className="buttonLogin" onClick = {handleAuth}>Login</Button>
            </Form>

        </Container>
    );

}

export default LoginView;