import React,{ useState, useEffect }  from "react";
import ReciboModal from '../componets/ReciboModal';
import {Container,Button } from 'react-bootstrap';
import ReciboService from '../services/ReciboService'
import Swal from 'sweetalert2'

import TablaRecibo from "../componets/TablaRecibo";
function ReciboView () {

    const [show, setShow] = useState(false);
    const [recb, setRecibo] = useState([]);

    useEffect(()=>{
        handleGetRecibos();
    },[])

    //Metodo delete Recibo
    const handleDeleteRecibo =  async (id) => {
        try {
            const resModal = await Swal.fire({
                title:'Eliminar Recibo',
                icon: 'info',
                text:'¿Esta Seguro de eliminar el Recibo?',
                showCancelButton:true,
                confirmButtonText:'Confirmar',
                cancelButtonText:'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
            if(!resModal.value){
                return;
            }

            const resp = await ReciboService.delete(id)
            console.log(resp)
            handleGetRecibos()
        } catch (error) {
            console.log(error);
        }
    }

    //Obtener los Recibos
    const handleGetRecibos = async () => {
        try {
            Swal.fire({
                allowOutsideClick:false,
                icon: 'info',
                text:'Por favor espere...',
                timer:10000
            });

            Swal.showLoading();
            const datos = await ReciboService.get();
            setRecibo(datos.data)
            console.log(datos.data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                title:'Error',
                icon:'error',
                text: 'Se presento un error al obtener los Recibos',
                timer: 5000
            })
        }
    }


    //metodo para cerrar 
    const handleClose = () => {
        setShow(false);
    }

    //metodo para abrir
    const handleOpenModal = () => {
        setShow(true);
    }
   return (
        <Container>
            <p></p>
            <TablaRecibo 

                recibos={recb}
                handleDeleteRecibo={handleDeleteRecibo}
                handleGetRecibos={handleGetRecibos}>
            </TablaRecibo>
                
                
            <Button variant="primary" size="lg" block onClick = {handleOpenModal}>Crear un Recibo</Button>
            {
                show &&
                <ReciboModal 
                show = {show} 
                handleClose = {handleClose}
                />
            }
        </Container>

    );
    

}

export default ReciboView; 