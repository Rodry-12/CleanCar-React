import React, { useState, useEffect } from "react";

import EmpleadosService from "../services/EmpleadosService";

import { Button, Container, ResponsiveEmbed } from "react-bootstrap";

import EmpleadosModal from "../componets/EmpleadoModal";

import TablaEmpleados from "../componets/TablaEmpleados";
import Swal from 'sweetalert2';

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
            Swal.fire({
                allowOutsideClick:false,
                icon: 'info',
                text:'Por favor espere...',
                timer:10000
            });

            Swal.showLoading();
            const datos = await EmpleadosService.get();
            setEmps(datos.data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                title:'Error',
                icon:'error',
                text: 'Se presento un error al obtener los Empleados',
                timer: 5000
            })
        }
    }

    //Metodo para eliminar los empleados 
    const handleDeleteEmpleados =  async (id) => {
        try {
            const resModal = await Swal.fire({
                title:'Eliminar empleado',
                icon: 'info',
                text:'¿Esta Seguro de eliminar el empleado?',
                showCancelButton:true,
                confirmButtonText:'Confirmar',
                cancelButtonText:'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
            if(!resModal.value){
                return;
            }

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
            <Button color="rgb(3, 69, 92)"  size="lg" onClick = {() =>handleOpenModal ("crear")}>Crear empleado</Button>
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