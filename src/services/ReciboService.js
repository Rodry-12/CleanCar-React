import {AxiosInstance} from "../config/axios-config"; 

class ReciboService {
    get(){
        return  AxiosInstance.get("recibo");
    }

    post(recibo){
        console.log(recibo)
        return AxiosInstance.post("recibo",recibo);
    }
}

export default new ReciboService(); 