import {AxiosInstance} from "../config/axios-config"; 

class VehiculosService {
    get(){
        return  AxiosInstance.get("vehiculos");
    }

    delete(id) {
        return AxiosInstance.delete(`vehiculos/${id}`);
    }

    post(vehiculo) {
        return AxiosInstance.post(`vehiculos`,vehiculo);
    }

    put(placa, vehiculo){
        return AxiosInstance.put(`vehiculos/${placa}`,vehiculo);
    }

}

export default new VehiculosService(); 