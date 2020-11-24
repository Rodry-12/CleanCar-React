import {AxiosInstance} from "../config/axios-config"; 

class VehiculosService {
    get(){
        return  AxiosInstance.get("vehiculos");
    }
}

export default new VehiculosService(); 