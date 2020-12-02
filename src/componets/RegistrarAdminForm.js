import React, { useState, useEffect } from "react";

import "../styles/login.css";

import { Form, FormGroup, FormLabel, FormControl, Button, Container, ButtonGroup } from "react-bootstrap";

import AdministradoresService from "../services/AdministradoresService";

import Swal from 'sweetalert2';


function RegistrarAdminForm(props) {

    const { handleCloseRegister } = props

    const [cedula, setCedula] = useState(null);
    const [nombres, setNombres] = useState(null);
    const [apellidos, setApellidos] = useState(null);
    const [contraseña, setContraseña] = useState(null);
    const [confirmarContraseña, setConfirmarContraseña] = useState(null);

    const [errorCedula, setErrorCedula] = useState(null);
    const [errorPass, setErrorPass] = useState(null);
    const [errorConfirmPass, setErrorConfirmPass] = useState(null);

    useEffect(() => {
        if (isNaN(cedula)) {
            setErrorCedula("Cedula debe ser un campo numerico");
        } else {
            setErrorCedula(null);
            return;
        }
    }, [cedula])

    useEffect(() => {
        if (!contraseña) {
            setErrorPass(null);
            return;
        }

        if (contraseña.length < 4) {
            setErrorPass("La contraseña debe contener 4 o mas caracteres")
        } else {
            setErrorPass(null);
            return;
        }

    }, [contraseña])

    useEffect(() => {
        if (!confirmarContraseña) {
            setErrorConfirmPass(null);
            return;
        }

        if (confirmarContraseña.length < 4) {
            setErrorConfirmPass("La contraseña debe contener 4 o mas caracteres")
        } else {
            setErrorConfirmPass(null);
            return;
        }
    }, [confirmarContraseña])



    const handleValidarPassword = async () => {
        if (contraseña === confirmarContraseña) {
            handleCreateAdmin();
            return;
        }
        Swal.fire({
            allowOutsideClick: false,
            title: "Error",
            icon: "error",
            text: "las contraseñas no coinciden"
        })
    }

    const handleCreateAdmin = async () => {
        try {
            const resp = await AdministradoresService.create({
                cedulaAdmin: cedula,
                nombres: nombres,
                apellidos: apellidos,
                password: contraseña
            })
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Administrador creado exitosamente!`,
                showConfirmButton: false,
                timer: 1500
            })
            console.log(resp);
            window.location.pathname = "/administradores/login";
        } catch (error) {
            Swal.fire({
                allowOutsideClick: false,
                title: "Error",
                icon: "error",
                text: "Ocurrio un error al Registrarse"
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
                setCedula(value ? value : null);
                break;
            case "nombres":
                setNombres(value ? value : null);
                break;
            case "apellidos":
                setApellidos(value ? value : null);
                break;
            case "contraseña":
                setContraseña(value ? value : null);
                break;
            case "confirmarContraseña":
                setConfirmarContraseña(value ? value : null);
                break;
        }
    }

    return (
        <div className="containerRegister">
            <Container className="formRegister">
                <Form>
                    <FormGroup>
                        <FormLabel>Cedula</FormLabel>
                        <FormControl
                            name="cedula"
                            placeholder="Cedula Administrador"
                            onChange={handleOnChange}
                            value={cedula ? cedula : null}

                        >
                        </FormControl>
                        <span className="text-danger" >{errorCedula}</span>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl
                            name="nombres"
                            placeholder="Nombres"
                            onChange={handleOnChange}
                            value={nombres ? nombres : null}
                        >
                        </FormControl>

                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl
                            name="apellidos"
                            placeholder="Apellidos"
                            onChange={handleOnChange}
                            value={apellidos ? apellidos : null}
                        >

                        </FormControl>

                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl
                            name="contraseña"
                            placeholder="Contraseña"
                            onChange={handleOnChange}
                            type="password"
                            value={contraseña ? contraseña : null}
                        >
                        </FormControl>
                        <span className="text-danger" >{errorPass}</span>
                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl
                            name="confirmarContraseña"
                            placeholder="Contraseña"
                            onChange={handleOnChange}
                            type="password"
                            value={confirmarContraseña ? confirmarContraseña : null}
                        >
                        </FormControl>
                        <span className="text-danger" >{errorConfirmPass}</span>
                    </FormGroup>

                    <div className="buttonGropRegister">
                        <Button className="buttonBack" variant="outline-danger" onClick={handleCloseRegister}>Regresar</Button>
                        <Button 
                            className="buttonRegister" 
                            variant="success" 
                            onClick={handleValidarPassword}
                            disabled={
                                !cedula ||
                                !nombres ||
                                !apellidos ||
                                !contraseña ||
                                !confirmarContraseña 
                            }
                            >Registrarse</Button>
                    </div>

                </Form>
            </Container>


        </div>
    )
}

export default RegistrarAdminForm