import {AxiosInstance} from "../config/axios-config"; 

class AdministradoresService {
    get(){
        return  AxiosInstance.get("administradores");
    }

}

export default new AdministradoresService(); 