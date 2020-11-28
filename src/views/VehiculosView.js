import React, { useEffect, useState } from "react";

import { Button, CardDeck, Container, FormControl, InputGroup } from "react-bootstrap";

import VehiculosServicie from "../services/VehiculosService";

import CardVehiculo from "../componets/CardVehiculo";

import VehiculoModal from "../componets/VehiculoModal";

import Swal from 'sweetalert2';



function VehiculosView() {

    const [vehiculos, setVehiculos] = useState(null);

    const [show, setShow] = useState(false);

    const [accion, setAccion] = useState(null);

    const [vehiculoActualizar, setVehiculoActualizar] = useState(null);

    useEffect(() => {
        handleGetVehiculos();
    }, [])

    const handleGetVehiculos = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Por favor espere...',
                timer: 10000
            });

            Swal.showLoading();
            const resp = await VehiculosServicie.get();
            setVehiculos(resp.data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Se presentó un error al obtener los Vehiculos',
                timer: 5000
            })
        }
    }

    const handleDeleteVehiculo = async (placa) => {
        try {
            const resModal = await Swal.fire({
                title: 'Se eliminará el vehiculo',
                icon: 'info',
                text: '¿Esta Seguro de eliminar el vehiculo?',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
            if (!resModal.value) {
                return;
            }

            const resp = await VehiculosServicie.delete(placa);
            console.log(resp);
            handleGetVehiculos();
        } catch (error) {
            console.log(error);
        }
    }

    const handleVehiculoActualizar = (vehiculoActualizar) => {
        handleOpenModal("editar");
        setVehiculoActualizar(vehiculoActualizar);
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

        return arrayRows.map((row, index) => {
            return (
                <CardDeck key={index}>
                    {
                        vehiculos.slice(
                            index === 0 ? index : index * columns,
                            index === 0 ? columns : index * columns + columns
                        ).map((vehiculo, index) => {
                            return <CardVehiculo
                                key={index}
                                placa={vehiculo.placa}
                                nombre={vehiculo.nombre}
                                modelo={vehiculo.modelo}
                                marca={vehiculo.marca}
                                color={vehiculo.color}
                                image={vehiculo.image}
                                dueño={vehiculo.dueño}
                                handleDeleteVehiculo={handleDeleteVehiculo}
                                handleVehiculoActualizar={handleVehiculoActualizar}

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
              <Button variant="outline-primary" size="lg" block onClick = {() =>handleOpenModal("crear")} >Crea un nuevo vehiculo</Button>
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

