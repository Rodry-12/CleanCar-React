import {AxiosInstance} from "../config/axios-config"; 

class EmpleadosService {
    get(){
        return  AxiosInstance.get("empleados");
    }

    delete (id) {
        return AxiosInstance.delete(`empleados/${id}`);
    }
}

export default new EmpleadosService(); 