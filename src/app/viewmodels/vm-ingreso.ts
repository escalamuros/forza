import {loginPorCredenciales, loginPorTime} from "../models/loginModels/loginRequest";
import {respuestaLogin} from "../models/loginModels/loginResponse";
import {loginService} from "../services/login.service"
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class VmIngreso {
    public _respuesta:respuestaLogin

    constructor(private LoginService:loginService){
    }

    ngOnInit():void{
    }

    async loginPorCredenciales(ingresos:loginPorCredenciales):Promise<respuestaLogin>{
        console.log("[VMIngreso] funcion loginPorCredenciales")
        console.dir(ingresos)
        this._respuesta= await this.LoginService.loginConCredenciales(ingresos)
        console.log("[VMIngreso] respuesta:")
        console.dir(this._respuesta)
        return new Promise(async (resolve,reject)=>{resolve(this._respuesta)})
    }

}
