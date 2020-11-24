import {AxiosInstance} from "../config/axios-config"; 

class ReciboService {
    get(){
        return  AxiosInstance.get("recibo");
    }
}

export default new ReciboService(); 