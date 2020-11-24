import {AxiosInstance} from "../config/axios-config"; 

class ServiciosService {
    get(){
        return  AxiosInstance.get("servicios");
    }
}

export default new ServiciosService(); 