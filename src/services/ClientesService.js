import {AxiosInstance} from "../config/axios-config"; 

class ClientesService {
    get(){
        return  AxiosInstance.get("clientes");
    }
}

export default new ClientesService(); 