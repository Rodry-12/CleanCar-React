import {AxiosInstance} from "../config/axios-config"; 

class AdministradoresService {
    get(){
        return  AxiosInstance.get("administradores");
    }

    auth(admin) {
        return AxiosInstance.post(`administradores/login`,admin);
    }

}

export default new AdministradoresService(); 