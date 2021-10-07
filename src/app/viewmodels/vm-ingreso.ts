import {loginPorCredenciales} from "../interfaces/login/loginRequest"
import {respuestaLogin} from "../interfaces/login/loginResponse"

import {Injectable} from "@angular/core"
import {UcIngresoService} from "../aplicacion/casos de uso/login/ingreso/uc-ingreso.service"

@Injectable({providedIn:'root'})
export class VmIngreso {
    public respuesta:respuestaLogin

    constructor(private _ucIngreso:UcIngresoService){
    }

    async loginPorCredenciales(ingresos:loginPorCredenciales):Promise<respuestaLogin>{
        console.log("[VMIngreso] funcion loginPorCredenciales")
        console.dir(ingresos)
        this.respuesta= await this._ucIngreso.loginPorCredenciales(ingresos)
        console.log("[VMIngreso] respuesta:")
        console.dir(this.respuesta)
        return new Promise(async (resolve,reject)=>{resolve(this.respuesta)})
    }

}
