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
import * as firebase from "nativescript-plugin-firebase";
import {AndroidActivityBackPressedEventData} from "tns-core-modules";

import {UsuarioService} from "../../../../dominio/entidades/usuario.service";
import {SesionService} from "../../../../dominio/entidades/sesion.service";
import {LineaService} from "../../../../dominio/entidades/linea.service";

@Injectable({
  providedIn: 'root'
})
export class SplashService {


    constructor(private _sesion:SesionService,
                private _usuario:UsuarioService,
                private _linea:LineaService) {

    }

    usuarioEstaLogeado(){
        console.log("[SplashService] f usuarioEstaLogeado")
        this._usuario.rescatarDePersistencia()
        if(this._usuario.estaLogeado()){
            console.log("[SplashService] usuario esta")
            return true
        }
        return false
    }

    sesionEstaCreada(){
        console.log("[SplashService] f sesionEstaCreada")
        this._sesion.rescatarDePersistencia()
        if(this._sesion.estaCreada()){
            console.log("[SplashService] sesion esta")
            return true
        }
        return false
    }

    lineaEstaSeleccionada(){
        this._linea.rescatarDePersistencia()
        if(this._linea.obtenerId()!="0"){
            console.log("[SplashService] linea esta seleccionada")
            return true
        }
        console.log("[SplashService] no tiene lineas")
        return false
    }

    inicioApp(): string {
        //aqui iria logica de la app para prepararse a iniciar
        console.log("[SplashService] f inicioApp")
        let respuesta:string
        //todo:  revisar servicio de disponibilidad (bloqueo y modal)
        //todo:  revisar mantenedor (esqueleto) (modal de error)

        // Rescatar datos desde persistencia local (usuario,linea,sesion)
        let usuarioOk=this.usuarioEstaLogeado()
        let sesionOk=this.sesionEstaCreada()
        //todo:  verifica el estado de logeo:
        if(usuarioOk&&sesionOk){
            //todo:  si esta logeado:
            // todo:  ver token de session vencido y renovar si es necesario
            respuesta="resumen"
            let lineaOk = this.lineaEstaSeleccionada()
            if(!lineaOk){
                respuesta="registrar_linea"
            }
            //todo: indicar que tipo de linea esta, para redirigirlo a un resumen especifico
            //todo: validar login biometrico
        }else{
            respuesta="ingreso"
        }
        //todo:  validar la version minima de la app (modal)
        //todo:  validar sistema encuesta (modal)
        //todo:  validar notificacion con deeplink (redireccion)
        firebase
            .init()
            .then(() => {
                console.log("[SplashService]firebase iniciado")
            })

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

        applicationOn(launchEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] launchEvent");
                if (args.android) {
                    // For Android applications, args.android is an android.content.Intent class.
                    console.log("[SplashService] en Android, intent: " + args.android + ".");
                } else if (args.ios !== undefined) {
                    // For iOS applications, args.ios is NSDictionary (launchOptions).
                    console.log("[SplashService] en iOS, options: " + args.ios);
                }
            });

        applicationOn(suspendEvent, (args: ApplicationEventData) => {
                console.log("[SplashService] suspendEvent");
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

        return respuesta
    }


}
