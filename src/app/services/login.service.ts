import {Injectable} from "@angular/core";

import {loginPorCredenciales} from "../models/loginModels/loginRequest";
import {respuestaLogin} from "../models/loginModels/loginResponse";

@Injectable({providedIn:'root',})

export class loginService {
    public _credenciales:loginPorCredenciales
    private _respuesta:respuestaLogin

    constructor(){
    }

    async loginConCredenciales(credenciales:loginPorCredenciales):Promise<respuestaLogin>{
        console.log("[loginService]funcion loginConCredenciales")
        this._credenciales={rut:credenciales.rut,clave:credenciales.clave}
        this.validarCredenciales()
        console.log(this._respuesta)
        return new Promise(async (resolve,reject)=>{resolve(this._respuesta)})
    }

    validarCredenciales(){
        console.log("[loginService]funcion validarCredenciales")
        if((this._credenciales.rut=="si")&&(this._credenciales.clave=="no")){
            this._respuesta={estado:"ok"}
        }else{
            this._respuesta={estado:"nook"}
        }
    }

}
