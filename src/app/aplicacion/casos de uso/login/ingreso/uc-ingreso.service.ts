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
                private _usuario: UsuarioService/*,
                private _linea: LineaEnContextoService,
                private _session: SessionService*/
    ) {
        this.respuesta={estado:"ok",segmento:"user"}
    }

    loginPorCredenciales(credenciales: loginPorCredenciales): Observable<respuestaLogin> {
        console.log("[UCIngreso] funcion loginPorCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer =>{
            this._loginService.IntertarloginConCredenciales(credenciales).subscribe(
                resp=>{
                    console.log("[UCIngreso] respuesta loginCredenciales ");
                    if(resp.estado){
                        observer.next(this.respuesta)
                    }else{
                        this.guardarUsuarioLogeado(resp)
                        if(this._usuario.getTipoLinea()==="MOVIL"){
                            const agrupado={
                                customerId:this._usuario.getCustomerIdLinea(),
                                accessToken:this._usuario.getAccessToken(),
                                mcssToken:this._usuario.getMcssToken()
                            }
                            this._loginService.updateClientUserContext(agrupado).subscribe(resp=>{
                                console.log("[UCIngreso] respuesta updateClientUserContext "+JSON.stringify(resp))
                            })
                        }else{

                        }

                        observer.next(this.respuesta)
                    }
                    observer.complete()
                }
            )
        })
        return respuesta$
    }

    guardarUsuarioLogeado(resp){
        console.log("[UCIngreso] f guardarUsuarioLogeado")
        let tiempoVenceAccessToken = new Date().getTime()+resp.expires_in
        let accessToken = resp.access_token
        let refreshToken = resp.refresh_token
        let mcssToken = resp.mcsstoken
        let linea = {idclie:"no",tipo:"no"};
        let customerIdLinea = "no";
        let tipoLinea = "no";
        let productos=resp.responseBknd.token.cliente.productos.producto;
        //todo:datos del usuario
        //todo:datos de la linea inicial:id,tipo,tipoContrato,rol,preferido,
        if(productos[0]){
            linea = productos[0]
            customerIdLinea = linea.idclie
            tipoLinea = linea.tipo
            console.log("[UCIngreso] linea 0:"+JSON.stringify(linea))
        }
        this._usuario.iniciarUsuario({
            tipoLogin:"credenciales",
            tiempoVenceAccessToken:tiempoVenceAccessToken,
            accessToken:accessToken,
            refreshToken:refreshToken,
            mcssToken:mcssToken,
            linea:linea,
            customerIdLinea:customerIdLinea,
            tipoLinea:tipoLinea
        })
        this.respuesta={estado:"ok",segmento:"user"}
    }

}
