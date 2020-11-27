import {AxiosInstance} from "../config/axios-config"; 

class VehiculosService {
    get(){
        return  AxiosInstance.get("vehiculos");
    }

    delete(id) {
        return AxiosInstance.delete(`vehiculos/${id}`);
    }
}

export default new VehiculosService(); 