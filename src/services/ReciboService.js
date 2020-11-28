import {AxiosInstance} from "../config/axios-config"; 

class ReciboService {
    get(){
        return  AxiosInstance.get("recibo");
    }

    post(recibo){
        console.log(recibo)
        return AxiosInstance.post("recibo",recibo);
    }

    delete (id) {
        return AxiosInstance.delete(`recibo/${id}`);
    }

    put(id,empleado) {
        return AxiosInstance.put(`empleados/${id}`,empleado);
    }
}

export default new ReciboService(); 