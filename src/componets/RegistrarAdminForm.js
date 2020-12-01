import React, {useState} from "react";

import "../styles/login.css";

import { Form, FormGroup, FormLabel, FormControl, Button, Container, ButtonGroup } from "react-bootstrap";

import AdministradoresService from "../services/AdministradoresService";

import Swal from 'sweetalert2';


function RegistrarAdminForm(props) {

    const {handleCloseRegister} = props

    const [cedula, setCedula] = useState(null);
    const [nombres, setNombres] = useState(null);
    const [apellidos, setApellidos] = useState(null);
    const [contraseña, setContraseña] = useState(null);
    const [confirmarContraseña, setConfirmarContraseña] = useState(null);

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
                setApellidos(value ? value: null);
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
                            onChange = {handleOnChange}
                            value = {cedula? cedula:null}
                            
                            >
                        </FormControl>
                        <span className="text-danger" ></span>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl
                            name="nombres"
                            placeholder="Contraseña"
                            onChange = {handleOnChange}
                            value = {nombres? nombres:null}
                            >
                        </FormControl>
                        <span className="text-danger" ></span>
                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl
                            name="apellidos"
                            placeholder="Contraseña" 
                            onChange = {handleOnChange}
                            value = {apellidos? apellidos:null}
                            >

                        </FormControl>
                        <span className="text-danger" ></span>
                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl
                            name="contraseña"
                            placeholder="Contraseña"
                            onChange = {handleOnChange}
                            type="password"
                            value = {contraseña? contraseña:null}
                            >
                        </FormControl>
                        <span className="text-danger" ></span>
                    </FormGroup>


                    <FormGroup>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl
                            name="confirmarContraseña"
                            placeholder="Contraseña" 
                            onChange = {handleOnChange}
                            type="password"
                            value = {confirmarContraseña ? confirmarContraseña:null}
                            >
                        </FormControl>
                        <span className="text-danger" ></span>
                    </FormGroup>

                    <div className = "buttonGropRegister">
                        <Button className="buttonBack" variant="outline-danger" onClick = {handleCloseRegister}>Regresar</Button>
                        <Button className="buttonRegister" variant ="success" onClick = {handleValidarPassword}>Registrarse</Button>
                    </div>

                </Form>
            </Container>


        </div>
    )
}

export default RegistrarAdminForm