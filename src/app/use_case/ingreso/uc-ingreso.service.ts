import {loginPorCredenciales} from "../../interfaces/login/loginRequest";
import {respuestaLogin} from "../../interfaces/login/loginResponse";

import {Injectable} from '@angular/core';
import {ApiLoginService} from "../../services/api-login.service";

@Injectable({
    providedIn: 'root'
})
export class UcIngresoService {
    public respuesta: respuestaLogin
    public contador: number

    constructor(private _loginService: ApiLoginService) {
        this.contador = 0
    }

    async loginPorCredenciales(credenciales: loginPorCredenciales): Promise<respuestaLogin> {
        console.log("[UCIngreso] funcion loginPorCredenciales")
        if (this.contador < 4) {
            this.respuesta = await this._loginService.loginCredenciales(credenciales)
            return new Promise(async (resolve, reject) => {
                this.contador=this.contador+1
                resolve(this.respuesta)
            })
        } else {
            this.respuesta={estado:"nook"}
            return new Promise(async (resolve, reject) => {
                reject(this.respuesta)
            })
        }
    }


}
