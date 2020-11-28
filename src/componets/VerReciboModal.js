import React, { useEffect } from "react";
import { Modal, Card, Table, Button } from "react-bootstrap";

function VerReciboModal(props) {
    const { showVer, handleVerCloseModal, reciboAver } = props;
    useEffect(() => {
        console.log(reciboAver);
    }, [])


    return (
        <Modal backdrop="static" show={showVer} onHide={handleVerCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Información del Recibo</Modal.Title>
            </Modal.Header>
            <Modal.Body  >
                <Card style={{ width: '28rem' }}>
                    <Card.Img variant="top" src  ={reciboAver.placa.image}/>
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center", fontSize: "40px" }} >{reciboAver.idServico.tipoServicio}</Card.Title>
                        <Card.Text style = {{textAlign: "center"}}>
                            {reciboAver.total}
                        </Card.Text>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>Empleado</th>
                                    <td>{reciboAver.cedulaEmp.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Nombre</th>
                                    <td>{reciboAver.placa.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Placa</th>
                                    <td>{reciboAver.placa.placa}</td>
                                </tr>
                                <tr>
                                    <th>Dueño</th>
                                    <td>{reciboAver.placa.dueño.nombre}</td>
                                </tr>
                                <br></br>
                            </tbody>

                        </Table>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Button variant="primary" onClick={handleVerCloseModal}>Ok</Button>
        </Modal>
    )
}

export default VerReciboModal;
