import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import VerReciboModal from '../componets/VerReciboModal'

function TablaRecibo(props) {

    const { recibos, handleDeleteRecibo, handleVerOpenModal } = props

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
                    recibos.map((recibo, item) => (
                        <tr key={item}>
                            <td>{recibo.total}</td>
                            <td>{recibo.cedulaEmp.nombre}</td>
                            <td>{recibo.idServico.tipoServicio}</td>
                            <td>{recibo.placa.placa}</td>
                            <td width="190px">
                                <Button size="sm" onClick={()=>handleVerOpenModal(recibo)}> Ver Recibo </Button>
                                {
                                }{'   '}
                                <Button variant="danger" size="sm"
                                    onClick={() => handleDeleteRecibo(recibo.codRecibo)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                }
            </tbody>
        </Table>



    )
}

export default TablaRecibo;