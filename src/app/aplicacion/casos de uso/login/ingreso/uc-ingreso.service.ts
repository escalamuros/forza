import {loginPorCredenciales} from "../../../../dominio/interfaces/login/loginRequest";
import {respuestaLogin} from "../../../../dominio/interfaces/login/loginResponse";

import {Injectable} from '@angular/core';
import {ApiLoginService} from "../../../../dominio/servicios/api-login.service";
import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {Observable,of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UcIngresoService {
    public respuesta: respuestaLogin

    constructor(private _loginService: ApiLoginService,
                private _usuario: UsuarioService
    ) {

    }

    async usuarioLogeado(){
        console.log("[UCIngreso] funcion usuarioLogeado")
        this._usuario
    }

    loginPorCredenciales(credenciales: loginPorCredenciales): Observable<respuestaLogin> {
        console.log("[UCIngreso] funcion loginPorCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer =>{
            this._loginService.IntertarloginConCredenciales(credenciales).subscribe(
                resp=>{
                    console.log("[UCIngreso] respuesta loginCredenciales ");
                    if(resp.estado){
                        observer.next({estado:"nook",segmento:"na"})
                    }else{
                        let accessToken=resp.access_token
                        let refreshToken=resp.refresh_token
                        let linea=resp.responseBknd.token.cliente.productos.producto[0]
                        let customerId=linea.idclie
                        //todo: ver si realizar un pipe y mergeMap para poner en contexto la linea
                        observer.next({estado:"ok",segmento:"user"})
                    }
                    observer.complete()
                }
            )
        })

        return respuesta$
    }


}
