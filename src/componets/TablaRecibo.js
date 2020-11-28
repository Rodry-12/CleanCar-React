import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import VerReciboModal from '../componets/VerReciboModal'

function TablaRecibo(props) {

    const { recibos, handleDeleteRecibo, handleGetRecibos } = props

    const [showVer, setShowVer] = useState(false);

    //metodo para cerrar 
    const handleClose = () => {
        setShowVer(false);
    }

    //metodo para abrir
    const handleVerOpenModal = () => {
        setShowVer(true);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Total</th>
                    <th width="280px">Empleado</th>
                    <th width="280px">Servicio</th>
                    <th>Vehiculo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    recibos.map((recibos, item) => (
                        <tr key={item}>
                            <td>{recibos.total}</td>
                            <td>{recibos.cedulaEmp.nombre}</td>
                            <td>{recibos.idServico.tipoServicio}</td>
                            <td>{recibos.placa.placa}</td>
                            <td width="190px">
                                <Button size="sm" onClick={handleVerOpenModal}> Ver Recibo </Button>
                                {
                                    showVer
                                    && <VerReciboModal
                                        showVer={showVer}
                                        handleClose={handleClose}
                                        recibo={recibos}
                                        handleGetRecibos={handleGetRecibos}>
                                    </VerReciboModal>
                                }{'   '}
                                <Button variant="danger" size="sm"
                                    onClick={() => handleDeleteRecibo(recibos.codRecibo)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                }
            </tbody>
        </Table>



    )
}

export default TablaRecibo;