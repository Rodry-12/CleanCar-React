import React, { useEffect } from "react";
import { Modal, Card, Table, Button } from "react-bootstrap";

function VerReciboModal(props) {
    const { showVer, handleClose, recibo, handleGetRecibos } = props;
    useEffect(() => {
        handleGetRecibos();
        console.log(recibo)
    }, [])

    return (
        <Modal backdrop="static" show={showVer} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Información del Recibo</Modal.Title>
            </Modal.Header>
            <Modal.Body  >
                <Card style={{ width: '28rem' }}>
                    <Card.Img variant="top" src={recibo.placa.image} />
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center", fontSize: "40px" }} >{recibo.idServico.tipoServicio}</Card.Title>

                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>Empleado</th>
                                    <td>{recibo.cedulaEmp.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Nombre V</th>
                                    <td>{recibo.placa.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Placa</th>
                                    <td>{recibo.placa.placa}</td>
                                </tr>
                                <tr>
                                    <th>Dueño</th>
                                    <td>{recibo.placa.dueño.nombre}</td>
                                </tr>
                                <br></br>
                            </tbody>

                        </Table>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Button variant="primary" onClick={handleClose}>Ok</Button>
        </Modal>
    )
}

export default VerReciboModal;