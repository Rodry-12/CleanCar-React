import {AxiosInstance} from "../config/axios-config"; 

class EmpleadosService {
    get(){
        return  AxiosInstance.get("empleados");
    }

    delete (id) {
        return AxiosInstance.delete(`empleados/${id}`);
    }

    post(empleado){
        return AxiosInstance.post(`empleados`,empleado);
    }

    put(id,empleado) {
        return AxiosInstance.put(`empleados/${id}`,empleado);
    }
}

export default new EmpleadosService(); 