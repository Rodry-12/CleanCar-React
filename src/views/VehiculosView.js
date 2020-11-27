import React, { useEffect, useState } from "react";

import { Button, CardDeck, Container } from "react-bootstrap";

import VehiculosServicie from "../services/VehiculosService";

import CardVehiculo from "../componets/CardVehiculo";

import VehiculoModal from "../componets/VehiculoModal";



function VehiculosView() {

    const [vehiculos, setVehiculos] = useState(null);

    const[show, setShow] = useState(false);

    const [accion,setAccion] = useState(null);

    const [vehiculoActualizar, setVehiculoActualizar] = useState(null);

    useEffect(() => {
        handleGetVehiculos();
    }, [])

    const handleGetVehiculos = async () => {
        try {
            const resp = await VehiculosServicie.get();
            setVehiculos(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteVehiculo = async (placa) => {
        try {
            const resp = await VehiculosServicie.delete(placa);
            console.log(resp);
            handleGetVehiculos();
        } catch (error) {
            console.log(error);
        }
    }

    const handleVehiculoActualizar = (vehiculoActualizar) =>{
        handleOpenModal("editar");
        console.log(vehiculoActualizar);
    }

    //metodo para cerrar modal 
    const handleClose = () => {
        setShow(false);
    }

    //metodo para abrir modal 
    const handleOpenModal = (accion) => {
        setShow(true);
        setAccion(accion);
    }

    const handleRenderVehiculo = () => {
        if (!vehiculos || vehiculos.length === 0) {
            return <div>No existen datos</div>
        }

        const columns = 2;
        let rows = Math.floor(vehiculos.length / columns);

        const resto = vehiculos.length % columns
        if (resto !== 0) {
            rows = rows + 1;
        }

        const arrayRows = [...Array(rows)];

        return arrayRows.map((row,index) =>{
            return (
                <CardDeck key = {index}>
                    {
                        vehiculos.slice(
                            index === 0 ? index: index*columns,
                            index === 0 ? columns : index *columns + columns
                        ).map((vehiculo,index)=>{
                            return <CardVehiculo
                            key = {index}
                            placa = {vehiculo.placa}
                            nombre = {vehiculo.nombre}
                            modelo = {vehiculo.modelo}
                            marca = {vehiculo.marca}
                            color = {vehiculo.color}
                            image = {vehiculo.image}
                            dueño = {vehiculo.dueño}
                            handleDeleteVehiculo = {handleDeleteVehiculo}
                            handleVehiculoActualizar = {handleVehiculoActualizar}

                             />
                        })
                    }

                </CardDeck>
            );
        });


    }

    return (
        <Container>
            <div style = {{margin:"5px"}}>
              <Button variant="outline-success" size="lg" block onClick = {() =>handleOpenModal("crear")} >Crea un nuevo vehiculo</Button>
              {
                  show
                  && <VehiculoModal 
                  show = {show}
                  handleClose = {handleClose}
                  handleGetVehiculos = {handleGetVehiculos}
                  vehiculo = {vehiculoActualizar}
                  accion = {accion} 
                  />
              }
            </div>
            {handleRenderVehiculo()}
        </Container>
    );

}

export default VehiculosView; 