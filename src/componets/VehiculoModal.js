import React, { useEffect, useState } from "react";
import { Modal, FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import ClientesService from "../services/ClientesService";
import VehiculosService from "../services/VehiculosService";
import Swal from 'sweetalert2';

function VehiculoModal(props) {

    const { show, handleClose, handleGetVehiculos, vehiculo, accion } = props

    useEffect(() => {
        handleGetClientes();
    }, [])

    //Clientes para llenar la caja de texto
    const [clientes, setClientes] = useState(null);


    //Variables para actualizar 
    const [placa, setPlaca] = useState(accion === "editar" ? vehiculo.placa : null);
    const [nombre, setNombre] = useState(accion === "editar" ? vehiculo.nombre : null);
    const [marca, setMarca] = useState(accion === "editar" ? vehiculo.marca : null);
    const [modelo, setModelo] = useState(accion === "editar" ? vehiculo.modelo : null);
    const [color, setColor] = useState(accion === "editar" ? vehiculo.color : null);
    const [dueño, setDueño] = useState(accion === "editar" ? vehiculo.dueño : null);
    const [imagen, setImagen] = useState(accion === "editar" ? vehiculo.image : null);


    const handleGetClientes = async () => {
        try {
            const resp = await ClientesService.get();
            setClientes(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCrearVehiculo = async () => {
        try {
            const resp = await VehiculosService.post({
                placa: placa,
                nombre: nombre,
                marca: marca,
                modelo: modelo,
                color: color,
                dueño: {
                    ccCliente: parseInt(dueño)
                },
                image: imagen
            })
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Vehiculo Creado',
                showConfirmButton: false,
                timer: 1000
            })
            handleClose();
            handleGetVehiculos();
            console.log(resp);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Se presentó un problema al crear el vehiculo',
                timer: 5000
            })
        }
    }

    const handleActualizarVehiculo = async () => {
        try {
            const resp = await VehiculosService.put(placa, {
                placa: placa,
                nombre: nombre,
                marca: marca,
                modelo: modelo,
                color: color,
                dueño: {
                    ccCliente: parseInt(dueño)
                },
                image: imagen
            });
            console.log(resp);
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Vehiculo Actualizado',
                showConfirmButton: false,
                timer: 1000
            })
            handleClose();
            handleGetVehiculos();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Se presentó un problema al actualizar el vehiculo',
                timer: 5000
            })
        }

    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(value);

        switch (name) {
            case "placa":
                setPlaca(value ? value : null);
                break;
            case "nombre":
                setNombre(value ? value : null);
                break;
            case "modelo":
                setModelo(value ? value : null);
                break;
            case "marca":
                setMarca(value ? value : null);
                break;
            case "color":
                setColor(value ? value : null);
                break;
            case "dueño":
                setDueño(value ? value : null);
                break;
            case "imagen":
                setImagen(value ? value : null);
                break;
        }

    }


    return (
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{accion === "editar" ? "Actualizar Vehiculo" : "Crear Vehiculo"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <FormLabel>Placa</FormLabel>
                    <FormControl
                        disabled={accion == "editar" ? true : false}
                        name="placa"
                        onChange={handleOnChange}
                        value={placa ? placa : ""}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl
                        name="nombre"
                        onChange={handleOnChange}
                        value={nombre ? nombre : ""}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl
                        name="modelo"
                        onChange={handleOnChange}
                        value={modelo ? modelo : ""}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Marca</FormLabel>
                    <FormControl
                        name="marca"
                        onChange={handleOnChange}
                        value={marca ? marca : ""}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Color</FormLabel>
                    <FormControl
                        name="color"
                        onChange={handleOnChange}
                        value={color ? color : ""}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Dueño</FormLabel>
                    <FormControl
                        as="select"
                        name="dueño"
                        onChange={handleOnChange}
                        value={dueño ? dueño : ""}
                    >
                        <option value={accion === "editar" ? dueño.ccCliente : ""}> {accion === "editar" ? dueño.nombre : "-SELECCIONE"}</option>
                        {
                            clientes
                            && clientes.map((cliente, index) => {
                                return <option key={index} value={cliente.ccCliente}>{cliente.nombre}</option>
                            })
                        }
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl
                        name="imagen"
                        onChange={handleOnChange}
                        value={imagen ? imagen : ""}
                    />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                <Button variant="success" disabled = {
                    !placa ||
                    !nombre ||
                    !modelo ||
                    !marca ||
                    !color ||
                    !dueño ||
                    !imagen
                }
                onClick={accion === "editar" ? handleActualizarVehiculo : handleCrearVehiculo}>{accion === "editar" ? "Actualizar" : "Crear"}</Button>
            </Modal.Footer>

        </Modal>
    )

}

export default VehiculoModal;