import React, { useState, useEffect } from "react";

import { Modal, Form, FormGroup, Button, FormLabel, FormControl} from "react-bootstrap"

import AdministradoresServicie from "../services/AdministradoresService";
import EmpleadosService from "../services/EmpleadosService";
import Swal from 'sweetalert2'

function EmpleadosModal(props) {

    const { show, handleClose, handleGetEmpleados, empleado, accion } = props

    const [admin, setAdmin] = useState([])

    //Propiedades de los empleados 
    const [cedula, setCedula] = useState(accion == "editar" ? empleado.ccEmpleado: null);
    const [nombre, setNombre] = useState(accion == "editar" ? empleado.nombre: null);
    const [salario, setSalario] = useState(accion == "editar" ? empleado.salario: null);
    const [jefe, setJefe] = useState(accion == "editar" ? empleado.idJefe: null);


    useEffect(() => {
        handleGetAdmin()
    }, [])




    //Metodo para llamar los administradores
    const handleGetAdmin = async () => {
        try {
            const datos = await AdministradoresServicie.get();
            setAdmin(datos.data)
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleUdapteEmpleado = async () => {
        try {
            const resp = await EmpleadosService.put(empleado.ccEmpleado,{
                nombre: nombre,
                salario: salario,
                idJefe: {
                    cedulaAdmin: parseInt(jefe)
                }
            });
            handleClose();
            handleGetEmpleados();
            console.log(resp);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title:'Error',
                icon:'error',
                text: 'Se presento un problema al actualizar el empleado',
                timer: 5000
            })
        }

    }
    

    //Metodo para ingresar un empleado
    const handleSaveEmpleado = async () => {
        try {
            const repons = await EmpleadosService.post({
                ccEmpleado: cedula,
                nombre: nombre,
                salario: salario,
                idJefe: {
                    cedulaAdmin: parseInt(jefe)
                }
            });
            handleClose();
            handleGetEmpleados();
            console.log(repons);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title:'Error',
                icon:'error',
                text: 'Se presento un error al guardar un empleado',
                timer: 5000
            })
        }
    };

    //Metodo para capturar los datos del empleado
    const handleOnChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        console.log(e.target);

        switch (name) {
            case "cedula":
                setCedula(value ? value : null);
                console.log(cedula)
                break;
            case "nombre":
                setNombre(value ? value : null);
                break;
            case "salario":
                setSalario(value ? value : null);
                break;
            case "jefe":
                if (value) {
                    setJefe(value)
                } else {
                    setJefe(null)
                }
                break;

        }
    }

    return (
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{accion == "editar"? "Editar empleado":"Crear empleado"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Cedula Empleado</FormLabel>
                        <FormControl
                            disabled = {accion == "editar"? true: false}
                            name="cedula"
                            onChange={handleOnChange}
                            value={cedula ? cedula : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Nombres y apellidos</FormLabel>
                        <FormControl
                            name="nombre"
                            onChange={handleOnChange}
                            value={nombre ? nombre : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Salario</FormLabel>
                        <FormControl
                            name="salario"
                            onChange={handleOnChange}
                            value={salario ? salario : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Jefe</FormLabel>
                        <FormControl
                            as="select"
                            name="jefe"
                            onChange={handleOnChange}
                            value={jefe ? jefe : ""}>
                            <option value={accion == "editar" ? jefe.cedulaAdmin:""}> {accion == "editar" ? jefe.nombres:"-SELECCIONE-"}</option>
                            {
                                admin
                                && admin.map((admin, item) => {
                                    return <option key={item} value={admin.cedulaAdmin}> {admin.nombres}</option>
                                })
                            }
                        </FormControl>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success"
                    disabled={
                        !cedula ||
                        !nombre ||
                        !salario ||
                        !jefe
                    }
                    onClick={accion == "editar" ?  handleUdapteEmpleado:handleSaveEmpleado}
                >
                    {accion == "editar" ? "Actualizar" : "Crear"}
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default EmpleadosModal;