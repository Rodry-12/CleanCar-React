import React, { useState, useEffect } from "react";

import EmpleadosService from "../services/EmpleadosService";

import { Button, Container, ResponsiveEmbed } from "react-bootstrap";

import CreateEmpleadosModal from "../componets/CreateEmpleadoModal";

import TablaEmpleados from "../componets/TablaEmpleados";

const EmpleadosView = () => {

    const [emps, setEmps] = useState([])

    const [show, setShow] = useState(false);

    useEffect(() => {
        handleGetEmpleados()
    }, [])

    //Metodo para traer los empleados
    const handleGetEmpleados = async () => {
        try {
            const datos = await EmpleadosService.get();
            setEmps(datos.data)
        } catch (error) {
            console.log(error);
        }
    }

    //Metodo para eliminar los empleados 
    const handleDeleteEmpleados = async (id) => {
        try {
            const resp = await EmpleadosService.delete(id);
            console.log(resp)
            handleGetEmpleados()
        } catch (error) {
            console.log(error);
        }
    }

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
            <TablaEmpleados 
                empleados={emps} 
                handleDeleteEmpleados = {handleDeleteEmpleados}>
            </TablaEmpleados>
            <p></p>
            <Button variant="success" size="lg" onClick = {handleOpenModal}>Crear empleado</Button>
            {
                show &&
                <CreateEmpleadosModal 
                show = {show} 
                handleClose = {handleClose}
                handleGetEmpleados = {handleGetEmpleados}
                />
            }
        </Container>

    );
}

export default EmpleadosView;