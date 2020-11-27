import React from "react";

import { Card, Button, Table } from "react-bootstrap";


function CardVehiculos(props) {

    const vehiculoEditar = {placa:null, nombre:null, marca:null, modelo:null, color:null, dueño:null, image:null}

    const { placa, nombre, modelo, marca, color, dueño, image, handleDeleteVehiculo, handleVehiculoActualizar} = props

    vehiculoEditar.placa = placa;
    vehiculoEditar.nombre = nombre; 
    vehiculoEditar.marca = marca;
    vehiculoEditar.modelo = modelo;
    vehiculoEditar.color = color;
    vehiculoEditar.dueño = dueño;
    vehiculoEditar.image = image; 


    return (
        <Card style={{ width: '18rem', margin: "20px" }} variant="Dark">
            <Card.Img variant="top" src={image} />
            <Card.Title style={{ textAlign: "center", fontSize: "60px" }}>{nombre}</Card.Title>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Placa</th>
                        <td>{placa}</td>
                    </tr>
                    <tr>
                        <th>Modelo</th>
                        <td>{modelo}</td>
                    </tr>
                    <tr>
                        <th>marca</th>
                        <td>{marca}</td>
                    </tr>
                    <tr>
                        <th>Color</th>
                        <td>{color}</td>
                    </tr>
                    <tr>
                        <th>Dueño</th>
                        <td>{dueño.nombre}</td>
                    </tr>
                </tbody>

            </Table>
            <Card.Body>

                <Button variant="primary" block onClick = {() => handleVehiculoActualizar(vehiculoEditar)}>Editar</Button>

                <Button variant="danger" block onClick={() => handleDeleteVehiculo(placa)}>Eliminar</Button>

            </Card.Body>
        </Card>
    );
}

export default CardVehiculos