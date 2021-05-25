import {Injectable} from "@angular/core";

import {loginPorCredenciales} from "../interfaces/login/loginRequest";
import {respuestaLogin} from "../interfaces/login/loginResponse";

@Injectable({providedIn:'root',})

export class ApiLoginService {
    private credenciales:loginPorCredenciales
    private respuesta:respuestaLogin

    constructor(){
    }

    async loginPorCredenciales(credenciales:loginPorCredenciales):Promise<respuestaLogin>{
        console.log("[apiLoginService]funcion loginConCredenciales")
        this.credenciales={rut:credenciales.rut,clave:credenciales.clave}
        this.validarCredenciales()
        console.log(this.respuesta)
        return new Promise(async (resolve,reject)=>{resolve(this.respuesta)})
    }

    validarCredenciales(){
        console.log("[apiLoginService]funcion validarCredenciales")
        if((this.credenciales.rut=="si")&&(this.credenciales.clave=="no")){
            this.respuesta={estado:"ok"}
        }else{
            this.respuesta={estado:"nook"}
        }
    }

}
