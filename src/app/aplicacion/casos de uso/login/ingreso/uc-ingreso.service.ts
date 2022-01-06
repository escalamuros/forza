import {loginPorCredenciales} from "../../../../dominio/interfaces/login/loginRequest";
import {respuestaLogin} from "../../../../dominio/interfaces/login/loginResponse";

import {Injectable} from '@angular/core';
import {ApiLoginService} from "../../../../dominio/servicios/api-login.service";
import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {LineaService} from "../../../../dominio/entidades/linea.service";
import {SesionService} from "../../../../dominio/entidades/sesion.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UcIngresoService {
    public respuesta: respuestaLogin

    constructor(private _loginService: ApiLoginService,
                private _usuario: UsuarioService,
                private _session: SesionService,
                private _linea: LineaService,

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
                        this.respuesta.estado="error";
                        this.respuesta.error="Error en :"+ resp.tipo
                        observer.next(this.respuesta)
                    }else{
                        this.guardarUsuarioLogeado(resp)
                        //todo: corresponde a seleccion de linea, hacer caso de uso
                        if(this._usuario.obtenerTipoLinea()==="MOVIL"){
                            const agrupado={
                                customerId:this._usuario.obtenerCustomerIdLinea(),
                                accessToken:this._session.getAccessToken(),
                                mcssToken:this._session.getMcssToken()
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

    guardarSession(){}

    guardarLinea(){}

    guardarUsuarioLogeado(resp){
        console.log("[UCIngreso] f guardarUsuarioLogeado")
        let dataSesion={
            tiempoVenceAccessToken : new Date().getTime()+resp.expires_in,
            accessToken : resp.access_token,
            refreshToken : resp.refresh_token,
            mcssToken : resp.mcsstoken
        }
        let linea = {idclie:"no",tipo:"no"}
        let customerIdLinea = "no"
        let tipoLinea = "no"
        let productos=resp.responseBknd.token.cliente.productos.producto
        this.respuesta={estado:"nook",error:"Usuario registrado,Sin lineas"}

        if(Object.keys(productos).length>0){
            linea = productos[0]
            customerIdLinea = linea.idclie
            tipoLinea = linea.tipo
            this.respuesta={estado:"ok",segmento:"user"}
        }

        let dataUsuario={
            tipoLogin:"credenciales",
            nombre : resp.responseBknd.token.cliente.nombre,
            apellidos : resp.responseBknd.token.cliente.apellido_paterno+" "+resp.responseBknd.token.cliente.apellido_materno,
            correoElectronico : resp.responseBknd.token.cliente.contacto.mail,
            sms : resp.responseBknd.token.cliente.contacto.sms,
            rut : resp.rut+"-"+resp.dv,
            linea : linea,
            customerIdLinea : customerIdLinea,
            tipoLinea : tipoLinea,
            productos : productos
        }



        //todo:datos de la linea inicial:id,tipo,tipoContrato,rol,preferido,


        this._session.iniciarSesion(dataSesion)

        this._usuario.iniciarUsuario(dataUsuario)


    }

}
