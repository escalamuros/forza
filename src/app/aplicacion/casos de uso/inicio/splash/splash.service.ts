import { isIOS, isAndroid } from "@nativescript/core/platform/platform";
import { Injectable } from '@angular/core';
import {
    ApplicationEventData, exitEvent,
    launchEvent, lowMemoryEvent,
    on as applicationOn,
    resumeEvent,
    suspendEvent, uncaughtErrorEvent
} from "tns-core-modules/application";
import { Application, AndroidApplication } from "@nativescript/core";
import {AndroidActivityBackPressedEventData} from "tns-core-modules";

import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {SesionService} from "../../../../dominio/entidades/sesion.service";
import {LineaService} from "../../../../dominio/entidades/linea.service";

import {ApiTokenService} from "../../../../dominio/servicios/api-token.service";
import {ContadorIngresoService} from "../../../../dominio/entidades/contador-ingreso.service";
import {ProxyFirebaseService} from "../../../proxy/proxy.firebase.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SplashService {
    private f_suspend:boolean

    constructor(private _firebase:ProxyFirebaseService,
                private _token:ApiTokenService,
                private _sesion:SesionService,
                private _usuario:UsuarioService,
                private _linea:LineaService,
                private _contador:ContadorIngresoService) {
        this.f_suspend=false

    }

    rescatarDePersistencia():void{
        this._sesion.rescatarDePersistencia()
        this._usuario.rescatarDePersistencia()
        this._linea.rescatarDePersistencia()
    }

    usuarioEstaLogeado(){
        console.log("[SplashService] f usuarioEstaLogeado")
        if(this._usuario.estaLogeado()){
            console.log("[SplashService] usuario esta")
            return true
        }else{
            console.log("[SplashService] usuario NO esta")
            return false
        }

    }

    sesionEstaCreada(){
        console.log("[SplashService] f sesionEstaCreada")
        if(this._sesion.estaCreada()){
            console.log("[SplashService] sesion esta")
            return true
        } else{
            console.log("[SplashService] sesion NO esta")
            return false
        }

    }

    lineaEstaSeleccionada(){
        if(this._linea.obtenerId()!="0"){
            console.log("[SplashService] linea esta seleccionada")
            return true
        }
        console.log("[SplashService] no tiene lineas")
        return false
    }

    iniciarSistemaDeContador(){
        this._contador.obtenerDePersistencia()
        this._contador.aumentarContador()
    }

    iniciarPlugins(){
        this._firebase.inicio()
    }

    inicioApp(): Observable <string> {
        //aqui iria logica de la app para prepararse a iniciar

        //inicio ciclo de vida app
        this.activarCicloDeVida()

        //todo:  validar la version minima de la app (modal)
        //todo:  validar notificacion con deeplink (redireccion)

        //inicia servicios de plugin u otros servios requeridos
        this.iniciarPlugins()

        console.log("[SplashService] f inicioApp")
        let respuesta$ = new Observable<string>(obs => {
            //todo:  revisar servicio de disponibilidad (bloqueo y modal)
            //todo:  revisar mantenedor (esqueleto) (modal de error)


            // Rescatar datos desde persistencia local (usuario,linea,sesion,contador de ingreso)
            this.rescatarDePersistencia()
            let usuarioOk = this.usuarioEstaLogeado()
            let sesionOk = this.sesionEstaCreada()
            // verifica el estado de logeo:
            if (usuarioOk && sesionOk) {
                let lineaOk = this.lineaEstaSeleccionada()
                if (!lineaOk) {
                    obs.next("registrar_linea")
                    obs.complete()
                } else {
                    // Activar contador de ingreso
                    this.iniciarSistemaDeContador()
                    //todo:validr si debe refrescar token de la sesion
                    this.revisarTokenVencido().subscribe(resp=>{
                        console.log("[SplashService] respuesta revisarToken:",resp)
                        obs.next(resp)
                        obs.complete()
                    })
                }

            } else {
                //no hay usuario o no hay sesion: envia a login
                obs.next("ingreso")
                obs.complete()
            }
        })
        //todo: validar login biometrico
        return respuesta$
    }

    revisarTokenVencido(): Observable <string>{
        console.log("[SplashService] f revisaTokenVencido")
        let tiempoInicio:Date
        let tiempoFin:Date
        tiempoInicio=new Date()
        let respuesta$ = new Observable<string>(obs=>{
            if(this._linea.obtenerTipo() !== "MOVIL"){
                console.log("[SplashService] linea fija, no se refresca token")
                //todo: indicar que tipo de linea esta, para redirigirlo a un resumen especifico
                tiempoFin=new Date()
                this.calcularTiempo(tiempoInicio,tiempoFin)
                obs.next("resumen-fijo")
                obs.complete()
            }
            if(this._linea.obtenerTipo() === "MOVIL"){
                console.log("[SplashService] linea movil, se revisa si se debe refresca token")
                let tokenVencido=this._sesion.estaVencida()
                if(tokenVencido){
                    console.log("[SplashService] token vencido")
                    let refresh ={
                        refreshToken: this._sesion.getRefreshToken(),
                        accessToken: this._sesion.getAccessToken(),
                        mcssToken: this._sesion.getMcssToken()
                    }
                    this._token.refrescarToken(refresh).subscribe(resp=>{
                        console.log("[SplashService] respuesta renovar token:",resp)
                        if(resp.error){
                            console.log("[SplashService] falla renovar token")
                            obs.next("ingreso")
                            obs.complete()
                        }else{
                            console.log("[SplashService] exito renovar token")
                            //guardar sesion nueva
                            this._sesion.renovarToken(resp.datos)
                            //poner en contexto
                            let agrupado = {
                                customerId: this._linea.obtenerCustomerId(),
                                accessToken: this._sesion.getAccessToken(),
                                mcssToken: this._sesion.getMcssToken()
                            }
                            console.log("[SplashService] poner en contexto, luego de refrescar token")
                            console.log("[SplashService] agrupado:",agrupado)
                            this._token.updateClientUserContext(agrupado).subscribe(resp => {
                                console.log("[SplashService] respuesta updateClientUserContext ",resp)
                                if(resp.error){
                                    tiempoFin=new Date()
                                    this.calcularTiempo(tiempoInicio,tiempoFin)
                                    console.log("[SplashService] falla updateClientUserContext ")
                                    obs.next("ingreso")
                                }else{
                                    console.log("[SplashService] exito updateClientUserContext ")
                                    tiempoFin=new Date()
                                    this.calcularTiempo(tiempoInicio,tiempoFin)
                                    let segmento = this._linea.obtenerTipoContratoOri()
                                    //todo: indicar que tipo de linea esta, para redirigirlo a un resumen especifico
                                    console.log("[SplashService] debe redirigir al home segmento:",segmento)
                                    //obs.next("resumen-"+segmento)
                                    obs.next("resumen-postpago")
                                }
                                obs.complete()
                            })
                        }
                    })
                }else{
                    console.log("[SplashService] token vivo")
                    tiempoFin=new Date()
                    this.calcularTiempo(tiempoInicio,tiempoFin)
                    //todo: indicar que tipo de linea esta, para redirigirlo a un resumen especifico
                    obs.next("resumen-postpago")
                    obs.complete()
                }
            }
        })
        return respuesta$
    }

    calcularTiempo(inicio,fin){
        let temp=fin.getTime()-inicio.getTime()
        this._contador.guardarTiempoDeValidarToken(temp)
    }

    activarCicloDeVida(){
        //boton back fiico de android
        if (isAndroid) {
            Application.android.on(
                AndroidApplication.activityBackPressedEvent,
                (args: AndroidActivityBackPressedEventData) => {
                    if (args.eventName === "activityBackPressed") {
                        /*let ruta = this._enrrutador.router.url;
                        if (ruta === "/registro" || ruta === "/recuperar-contrasena") {
                            args.cancel = true;
                            this._enrrutador.navigate(['ingreso']);
                        } else if (ruta === "/login" || ruta === "/login?animateSplash=false") {*/
                        android.os.Process.killProcess(android.os.Process.myPid());
                        /*} else { }*/
                    }
                }
            );}

        //no hay evento LaunchEvent, ya que es la funcion de InicioApp
        /*applicationOn(launchEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] launchEvent");
                if (args.android) {
                    // For Android applications, args.android is an android.content.Intent class.
                    console.log("[SplashService] en Android, intent: " + args.android + ".");
                } else if (args.ios !== undefined) {
                    // For iOS applications, args.ios is NSDictionary (launchOptions).
                    console.log("[SplashService] en iOS, options: " + args.ios);
                }
            });*/

        applicationOn(suspendEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] suspendEvent");
                this.f_suspend=true
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashService]  Activity: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashService] UIApplication: " + args.ios);
                }
            });

        applicationOn(resumeEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] resumeEvent");
                if(this.f_suspend){
                    console.log("[SplashService] viene de segundo plano");
                }else{
                    console.log("[SplashService] viene de inicio de app");
                }
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashService] Activity: " + args.android);
                    //validar token si estaba logado
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashService] UIApplication: " + args.ios);
                }
            });

        applicationOn(exitEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] exitEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashService] Activity: " + args.android);
                    if (args.android.isFinishing()) {
                        console.log("[SplashService] Activity: " + args.android + " is exiting");
                    } else {
                        console.log("[SplashService] Activity: " + args.android + " is restarting");
                    }
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashService] UIApplication: " + args.ios);
                }
            });

        applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] lowMemoryEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashService] Activity: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashService] UIApplication: " + args.ios);
                }
            });

        applicationOn(uncaughtErrorEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] uncaughtErrorEvent");
                if (args.android) {
                    // For Android applications, args.android is an NativeScriptError.
                    console.log("[SplashService] NativeScriptError: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is NativeScriptError.
                    console.log("[SplashService] NativeScriptError: " + args.ios);
                }
            });
    }

}
