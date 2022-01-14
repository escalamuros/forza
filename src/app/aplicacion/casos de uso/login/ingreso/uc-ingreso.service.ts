import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

//modelos o interfaces de entrada y salida
import {loginPorCredenciales} from "../../../../dominio/interfaces/login/loginRequest";
import {respuestaLogin} from "../../../../dominio/interfaces/login/loginResponse";

//servicios a usar
import {ApiLoginService} from "../../../../dominio/servicios/api-login.service";
import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {LineaService} from "../../../../dominio/entidades/linea.service";
import {SesionService} from "../../../../dominio/entidades/sesion.service";


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
        this.respuesta={estado:"nook",error:"construccion del caso de uso"}
    }

    loginPorCredenciales(credenciales: loginPorCredenciales): Observable<respuestaLogin> {
        console.log("[UCIngreso] funcion loginPorCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer =>{
            this._loginService.IntertarloginConCredenciales(credenciales).subscribe(
                resp=>{
                    console.log("[UCIngreso] respuesta loginCredenciales ")
                    if(resp.error){
                        this.respuesta.estado="error";
                        this.respuesta.error="Error en :"+ resp.tipo
                        observer.next(this.respuesta)
                    }else{
                        this.respuesta.estado="ok"
                        this.respuesta.segmento=this._linea.obtenerTipo()
                        this.guardarRespuestas(resp)
                        //todo: corresponde a seleccion de linea, hacer caso de uso
                        if(this._linea.obtenerTipo()==="MOVIL"){
                            const agrupado={
                                customerId:this._linea.obtenerCustomerId(),
                                accessToken:this._session.getAccessToken(),
                                mcssToken:this._session.getMcssToken()
                            }
                            this._loginService.updateClientUserContext(agrupado).subscribe(resp=>{
                                console.log("[UCIngreso] respuesta updateClientUserContext "+JSON.stringify(resp))
                                this.respuesta.estado="ok"
                                this.respuesta.segmento=this._linea.obtenerTipo()
                                observer.next(this.respuesta)
                                observer.complete()
                            })
                        }
                        else{
                            observer.next(this.respuesta)
                            observer.complete()
                        }
                    }
                }
            )
        })
        return respuesta$
    }

    guardarRespuestas(resp){
        console.log("[UCIngreso] f guardarRespuestas")

        let productos=resp.responseBknd.token.cliente.productos.producto

        let dataSesion={
            tiempoVenceAccessToken : new Date().getTime()+resp.expires_in,
            accessToken : resp.access_token,
            refreshToken : resp.refresh_token,
            mcssToken : resp.mcsstoken
        }

        let dataUsuario={
            tipoLogin:"credenciales",
            nombre : resp.responseBknd.token.cliente.nombre,
            apellidos : resp.responseBknd.token.cliente.apellido_paterno+" "+resp.responseBknd.token.cliente.apellido_materno,
            correoElectronico : resp.responseBknd.token.cliente.contacto.mail,
            sms : resp.responseBknd.token.cliente.contacto.sms,
            rut : resp.rut+"-"+resp.dv,
            productos : productos
        }

        this._session.iniciarSesion(dataSesion)
        this._usuario.iniciarUsuario(dataUsuario)
        let hayLineaSeleccionada=this._linea.iniciarLinea(productos)
        if(hayLineaSeleccionada){

        }else{
            this.respuesta={estado:"ok",segmento:"registrar_linea",error:"Usuario registrado,Sin lineas"}
        }

    }

}
