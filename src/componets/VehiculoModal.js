import React from "react";
import { Modal } from "react-bootstrap";

function VehiculoModal (props) {

    const {show, handleClose, handleGetVehiculos, vehiculo, accion} = props
    return (
        <Modal backdrop="static" show={show} onHide = {handleClose}>
             <Modal.Header closeButton>
               <Modal.Title>{accion === "editar"? "Actualizar Vehiculo":"Crear Vehiculo"}</Modal.Title>
            </Modal.Header>
        </Modal>
    )

}

export default VehiculoModal;