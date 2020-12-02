import React, { useState, useEffect } from "react";

import { Container, Form, FormGroup, FormControl, FormLabel, Button, ButtonGroup } from "react-bootstrap";

import "../styles/login.css"
import AdministradoresService from "../services/AdministradoresService";

import Swal from 'sweetalert2';

import RegistrarAdminForm from "../componets/RegistrarAdminForm";


function LoginView() {


    const [cedulaAdmin, setCedulaAdmin] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorCedula, setErrorCedula] = useState(null);
    const [errorPass, setErrorPass] = useState(null);

    const [openRegister, setOpenRegister] = useState (false);

    useEffect(() => {
        //Validamos si la cedula es una cadena de numeros
        if (isNaN(cedulaAdmin)) {
            setErrorCedula("Cedula debe ser un campo numerico");
        } else {
            setErrorCedula(null);
            return;
        }
    }, [cedulaAdmin])//variable a evaluar cuando cambie 

    useEffect(() => {
        //si la contraseña es nula no habrá error de contraseña, por lo tanto no se mostrará 
        if (!password) {
            setErrorPass(null);
            return; //si la contraseña es nula no tiene nada más que hacer, por lo tanto nos salimos del metodo con 'return'
        }
        //Validamos si el tamaño de la contraseña es mayor a 4 
        if (password.length < 4) {
            setErrorPass('La contraseña debe contener 4 o mas caracteres');
        } else {
            setErrorPass(null);
            return;
        }
    }, [password])//variable a evaluar cuando cambie 


    const handleAuth = async () => {
        try {
            const resp = await AdministradoresService.auth({
                cedulaAdmin,
                password
            })
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Bienvenido ${resp.data.nombres} ${resp.data.apellidos}`,
                showConfirmButton: false,
                timer: 1500
            })
            console.log(resp);
            localStorage.setItem('token', JSON.stringify(resp.data))
            window.location.pathname = "/";

        } catch (error) {
            Swal.fire({
                allowOutsideClick: false,
                title: "Error",
                icon: "error",
                text: "Cedula o contraseña incorrecta"
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
                setCedulaAdmin(value ? value : null);
                break;
            case "contraseña":
                setPassword(value ? value : null);
                break;
        }
    }

    //para habrir nuestro formulario 
    const handleOpenRegister = () => {
        setOpenRegister(true);
    }

    //para cerrar nuestro formulario 
    const handleCloseRegister = () => {
        setOpenRegister(false);
    }

    return (
        <div className="primaryContainer">
            {
                !openRegister &&
                <div className="containerLogin">
                <Container className="formLogin">
                    <Form>
                        <FormGroup>
                            <FormLabel>Cedula</FormLabel>
                            <FormControl

                                name="cedula"
                                placeholder="Cedula Administrador"
                                onChange={handleOnChange}
                                value={cedulaAdmin ? cedulaAdmin : null}>
                            </FormControl>
                            <span className="text-danger" >{errorCedula}</span>
                            <br></br>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl
                                name="contraseña"
                                placeholder="Contraseña" type="password"
                                onChange={handleOnChange}
                                value={password ? password : null}>
                            </FormControl>
                            <span className="text-danger" >{errorPass}</span>
                        </FormGroup>
                            <Button className="buttonLogin" onClick={handleAuth} block>Login</Button>
                            <Button className="buttonRegisterLogin" size="sm" variant="outline-success" block onClick =  {handleOpenRegister} >Registrate!</Button>
                    </Form>
                </Container>
            </div>
            }
            {
                openRegister &&
                <RegistrarAdminForm
                    handleCloseRegister = {handleCloseRegister}
                >

                </RegistrarAdminForm>
            }
            
        </div>


    );

}

export default LoginView;