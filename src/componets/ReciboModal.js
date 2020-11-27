import React,{useState,useEffect} from 'react';
// Import de React-Bootstrap
import { Modal, Form, FormGroup, Button, FormLabel, FormControl } from "react-bootstrap"
// Import Service Recibo
import ReciboService from '../services/ReciboService';
import EmpleadosService from "../services/EmpleadosService";
import ServiciosService from '../services/ServiciosService';
import VehiculosService from '../services/VehiculosService';
import Swal from 'sweetalert2';

function ReciboModal(props){

    const [emps,setEmps] = useState(null);
    const [serv,setSers] = useState(null);
    const [vehi,setVehs] = useState(null);

    const [total, setTotal] = useState(null);
    const [cedulaEmp, setEmpleado] = useState(null);
    const [idServico, setServ] = useState(null);
    const [placa, setVehi] = useState(null);


    useEffect(() =>{
        handleGetEmpleado();
        handleGetServicios();
        handleGetVehiculos();
    },[])

    const {show,handleClose} = props;

    //Metodo para llamar a los empleados
    const handleGetEmpleado = async () => {
        try {
            const datos = await EmpleadosService.get();
            setEmps(datos.data)
           
        } catch (error) {
            console.log(error);
        }
    }
    //Metodo para obtener los Servicios
    const handleGetServicios = async () =>{
        try{
            const datos = await ServiciosService.get();
            setSers(datos.data);
        }catch(error){
            console.log(error);
        }
    }
    //Metodo para obtener los vehiculos
    const handleGetVehiculos = async () =>{
        try{
            const resp = await VehiculosService.get();
            setVehs(resp.data);
        }catch(error){
            console.log(error);
        }
    }

     //Metodo para Guardar un Recibo
     const handleSaveRecibo = async () =>{
         try{
            Swal.fire({
                allowOutsideClick:false,
                icon: 'info',
                text:'Por favor espere...',
                timer:1500
            });

            Swal.showLoading();
             const resp = await ReciboService.post({
                    total:total,
                    cedulaEmp: {
                        ccEmpleado: cedulaEmp
                    },
                    idServico: {
                        idServicios: idServico
                    },
                    placa: {
                        placa: placa
                    }
                 })
                 console.log(resp)
                 handleClose();
                 Swal.close();
            }catch(error){
                console.log(error)
                Swal.close();
                Swal.fire({
                    title:'Error',
                    icon:'error',
                    text: 'Se presento un error al guardar un recibo',
                    timer: 1500
                })
           }
        }


     //Metodo para capturar los datos del empleado
     const handleOnChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        console.log(e.target);

        switch (name) {
            case "total":
                setTotal(value ? value : null);
                console.log(total)
                break;
            case "cedulaEmp":
                if (value) {
                    setEmpleado(value)
                } else {
                    setEmpleado(null)
                }
                break;
            case "idServico":
                if (value) {
                    setServ(value)
                } else {
                    setServ(null)
                }
                break;
            case "placa":
                if (value) {
                    setVehi(value)
                } else {
                    setVehi(null)
                }
                break;

        }
    }

    return (
        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Recibo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Total Recibo</FormLabel>
                        <FormControl
                            name="total"
                            onChange={handleOnChange}
                            value={total ? total : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Empleado Encargado</FormLabel>
                        <FormControl
                            as="select"
                            name="cedulaEmp"
                            onChange={handleOnChange}
                            value = {cedulaEmp ? cedulaEmp:""}
                            >
                            <option value="">--SELECCIONE--</option>
                            {
                               emps
                               && emps.map((emp, item) => {
                                   return <option key={item} value={emp.ccEmpleado}> {emp.nombre}</option>
                               })
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Servicio Prestado</FormLabel>
                        <FormControl
                            as="select"
                            name="idServico"
                            onChange={handleOnChange}
                            value={idServico ? idServico : ""}>
                            <option value= "">--SELECCIONE--</option>
                            {
                               serv
                               && serv.map((ser,item) =>{
                                   return <option key={item} value={ser.idServicios}> {ser.tipoServicio} </option>
                               })
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Placa Vehiculo</FormLabel>
                        <FormControl
                            as="select"
                            name="placa"
                            onChange={handleOnChange}
                            value={placa ? placa : ""}>
                            <option value= "">--SELECCIONE--</option>
                            {
                               vehi
                               && vehi.map((veh,item) =>{
                                   return <option key={item} value={veh.placa}>{veh.placa} </option>
                               })
                            }
                        </FormControl>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="success"
                    disabled={
                        !total ||
                        !cedulaEmp ||
                        !idServico ||
                        !placa
                    }
                    onClick={handleSaveRecibo}
                >
                Crear
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ReciboModal;