import React, { useState, useEffect } from "react";

import { Modal, Form, FormGroup, Button, FormLabel, FormControl } from "react-bootstrap"

import AdministradoresServicie from "../services/AdministradoresService";

function CreateEmpleadosModal(props) {

    const { show, handleClose } = props

    const [admin, setAdmin] = useState([])

    useEffect (() =>{
        handleGetAdmin()
    },[])

    //Propiedades de los empleados 
    const [cedula, setCedula] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [salario, setSalario] = useState(null);
    const [jefe, setJefe] = useState(null);

    //Metodo para llamar los administradores
    const handleGetAdmin = async () =>{
        try {
            const datos = await AdministradoresServicie.get(); 
            setAdmin(datos.data)
            console.log(admin);
        } catch (error) {
            console.log(error);
        }
    }


    //Metodo para capturar los datos del empleado
    const handleOnChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        console.log(e.target);

        switch (name) {
            case "cedula":
                setCedula(value ? value : null);
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
                <Modal.Title>Crear Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Cedula Empleado</FormLabel>
                        <FormControl
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
                            value={jefe ? jefe: ""}>
                            <option value="">-SELECCIONE-</option>
                            {
                                admin
                                && admin.map((admin, item) =>{
                                return <option key ={item} value = {admin.cedulaAdmin}> {admin.nombres}</option>
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
                <Button variant="success">
                    Crear
      </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default CreateEmpleadosModal;