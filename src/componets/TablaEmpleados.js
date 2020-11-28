import React from "react";
import { Table, Button } from "react-bootstrap";

function TablaEmpleados(props) {
    const { empleados, handleDeleteEmpleados, handleEmpleadoActualizar} = props 

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Cedula</th>
                    <th>Nombres</th>
                    <th>salario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    empleados.map((empleados, item) => (
                        <tr key={item}>
                            <td>{empleados.ccEmpleado}</td>
                            <td>{empleados.nombre}</td>
                            <td>{empleados.salario}</td>
                            <td width="160px">
                                <Button size="sm" onClick = {() => handleEmpleadoActualizar(empleados)} >Editar</Button>
                                {' '}
                                <Button variant="danger" size="sm"
                                onClick = {() => handleDeleteEmpleados(empleados.ccEmpleado)} >Eliminar</Button>
                            </td>
                        </tr>

                    ))
                }
            </tbody>
        </Table>



    )
}

export default TablaEmpleados;
