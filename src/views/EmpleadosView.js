import React, { useState, useEffect } from "react";

import EmpleadosService from "../services/EmpleadosService";

import { Button, Container, ResponsiveEmbed } from "react-bootstrap";

import EmpleadosModal from "../componets/EmpleadoModal";

import TablaEmpleados from "../componets/TablaEmpleados";

const EmpleadosView = () => {

    const [emps, setEmps] = useState([])

    const [show, setShow] = useState(false);

    const [empleadoActualizar, setEmpleadoActualizar] = useState(null);

    const [accion,setAccion] = useState(null);

    useEffect(() => {
        handleGetEmpleados()
    }, [])

    const handleEmpleadoActualizar = async (empleado) => {
        handleOpenModal("editar");
        setEmpleadoActualizar(empleado)

    }
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
    const handleDeleteEmpleados =  async (id) => {
        try {
            const resp = await EmpleadosService.delete(id)
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
    const handleOpenModal = (accion) => {
        setShow(true);
        setAccion(accion)
    }

    return (
        <Container>
            <p></p>
            <TablaEmpleados 
                empleados={emps} 
                handleDeleteEmpleados = {handleDeleteEmpleados}
                handleEmpleadoActualizar = {handleEmpleadoActualizar}>
            </TablaEmpleados>
            <p></p>
            <Button variant="success" size="lg" onClick = {() =>handleOpenModal ("crear")}>Crear empleado</Button>
            {
                show &&
                <EmpleadosModal 
                show = {show} 
                handleClose = {handleClose}
                handleGetEmpleados = {handleGetEmpleados}
                empleado = {empleadoActualizar}
                accion = {accion}
                />
            }
        </Container>

    );
}

export default EmpleadosView;