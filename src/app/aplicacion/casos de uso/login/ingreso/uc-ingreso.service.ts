import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

//modelos o interfaces de entrada y salida
import {loginPorCredenciales} from "../../../../dominio/interfaces/login/loginRequest";
import {respuestaLogin} from "../../../../dominio/interfaces/login/loginResponse";

//servicios a usar
import {ApiLoginService} from "../../../../dominio/servicios/api-login.service";
import {ApiTokenService} from "../../../../dominio/servicios/api-token.service";
import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {LineaService} from "../../../../dominio/entidades/linea.service";
import {SesionService} from "../../../../dominio/entidades/sesion.service";
import {ContadorIngresoService} from "../../../../dominio/entidades/contador-ingreso.service";

@Injectable({
    providedIn: 'root'
})
export class UcIngresoService {
    public respuesta: respuestaLogin

    constructor(private _loginService: ApiLoginService,
                private _tokenService: ApiTokenService,
                private _usuario: UsuarioService,
                private _session: SesionService,
                private _linea: LineaService,
                private _contador:ContadorIngresoService
    ) {
        this.respuesta = {estado: "nook", error: "construccion del caso de uso"}
    }

    loginPorCredenciales(credenciales: loginPorCredenciales): Observable<respuestaLogin> {
        console.log("[UCIngreso] funcion loginPorCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer => {
            this._loginService.IntertarloginConCredenciales(credenciales).subscribe(
                resp => {
                    console.log("[UCIngreso] respuesta loginCredenciales ")
                    if (resp.error) {
                        this.respuesta.estado = "error";
                        this.respuesta.error = "Error en :" + resp.tipo
                        observer.next(this.respuesta)
                    } else {
                        this.respuesta.estado = "ok"
                        this.respuesta.segmento = this._linea.obtenerTipo()
                        this.guardarRespuestas(resp)
                        //todo: corresponde a seleccion de linea, hacer caso de uso
                        if (this._linea.obtenerTipo() === "MOVIL") {
                            const agrupado = {
                                customerId: this._linea.obtenerCustomerId(),
                                accessToken: this._session.getAccessToken(),
                                mcssToken: this._session.getMcssToken()
                            }
                            this._tokenService.updateClientUserContext(agrupado).subscribe(resp => {
                                if(resp.error){
                                    this.respuesta.estado = "nook"
                                    this.respuesta.error = resp.tipo
                                    observer.next(this.respuesta)
                                }
                                else{
                                    this.respuesta.estado = "ok"
                                    this.respuesta.segmento = this._linea.obtenerTipoContratoOri()
                                    observer.next(this.respuesta)
                                }
                                observer.complete()
                            })
                        } else {
                            observer.next(this.respuesta)
                            observer.complete()
                        }
                    }
                }
            )
        })
        return respuesta$
    }

    guardarRespuestas(resp) {
        console.log("[UCIngreso] f guardarRespuestas")
        let productos = resp.datos.responseBknd.token.cliente.productos.producto
        let dataSesion = {
            expira: resp.datos.expires_in,
            accessToken: resp.datos.access_token,
            refreshToken: resp.datos.refresh_token,
            mcssToken: resp.datos.mcsstoken
        }
        console.log("[UCIngreso] dataSesion:",dataSesion)
        let dataUsuario = {
            tipoLogin: "credenciales",
            nombre: resp.datos.responseBknd.token.cliente.nombre,
            apellidos: resp.datos.responseBknd.token.cliente.apellido_paterno + " " + resp.datos.responseBknd.token.cliente.apellido_materno,
            correoElectronico: resp.datos.responseBknd.token.cliente.contacto.mail,
            sms: resp.datos.responseBknd.token.cliente.contacto.sms,
            rut: resp.datos.rut + "-" + resp.datos.dv,
            productos: productos
        }
        console.log("[UCIngreso] dataUsuario:",dataUsuario)
        this._contador.iniciarConteo()
        this._contador.aumentarContador()
        this._session.iniciarSesion(dataSesion)
        this._usuario.iniciarUsuario(dataUsuario)
        let hayLineaSeleccionada = this._linea.iniciarLinea(productos)
        if (hayLineaSeleccionada) {
            //no realiza nada
        } else {
            this.respuesta = {estado: "ok", segmento: "registrar_linea", error: "Usuario registrado,Sin lineas"}
        }

    }

}
