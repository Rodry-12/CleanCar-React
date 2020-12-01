import {AxiosInstance} from "../config/axios-config"; 

class AdministradoresService {
    get(){
        return  AxiosInstance.get("administradores");
    }

    auth(admin) {
        return AxiosInstance.post(`administradores/login`,admin);
    }

    create(admin) {
        return AxiosInstance.post("administradores",admin)
    }

}

export default new AdministradoresService(); 