import {Injectable} from "@angular/core";

import {loginPorCredenciales} from "../../interfaces/login/loginRequest";
import {respuestaLogin} from "../../interfaces/login/loginResponse";

@Injectable({providedIn:'root',})

export class ApiLoginService {
    private credenciales:loginPorCredenciales
    private respuesta:respuestaLogin

    constructor(){
    }

    async loginCredenciales(credenciales:loginPorCredenciales):Promise<respuestaLogin>{
        this.credenciales={rut:credenciales.rut,clave:credenciales.clave}
        this.respuesta= this.validarCredenciales()
        return new Promise(async (resolve,reject)=>{resolve(this.respuesta)})
    }

    validarCredenciales():respuestaLogin{
        console.log("[apiLoginService]funcion validarCredenciales")
        if((this.credenciales.rut=="si")&&(this.credenciales.clave=="no")){
            return {estado:"ok",segmento:"user"}
        } else if((this.credenciales.rut=="si")&&(this.credenciales.clave=="si")){
            return {estado:"ok",segmento:"admin"}
        }else{
            return {estado:"nook"}
        }
    }

}
