import React, { useState,useEffect } from "react";

import { Container, Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";

import "../styles/login.css"
import AdministradoresService from "../services/AdministradoresService";

import Swal from 'sweetalert2';


function LoginView() {


    const [cedulaAdmin, setCedulaAdmin] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorCedula, setErrorCedula] = useState(null);
    const [errorPass,setErrorPass] = useState(null);

    useEffect(()=>{
        if(isNaN(cedulaAdmin)){
            setErrorCedula("Cedula debe ser un campo numerico");
        }else{
            setErrorCedula(null);
            return;
        }
    },[cedulaAdmin])

    useEffect(()=>{
        if(!password){
            setErrorPass(null);
            return;
        }

        if(password.length < 4){
            setErrorPass('La contraseña debe contener 4 o mas caracteres');
        }else{
            setErrorPass(null);
            return;
        }
    },[password])

    
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
                    <span className="text-danger" >{errorCedula}</span>
                    <br></br>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        name ="contraseña"
                        placeholder="Contraseña" type="password"
                        onChange = {handleOnChange}
                        value={password ? password : null}>
                    </FormControl>
                     <span className="text-danger" >{errorPass}</span>
                </FormGroup>

                <Button className="buttonLogin" onClick = {handleAuth}>Login</Button>
            </Form>

        </Container>
    );

}

export default LoginView;