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

@Injectable({
  providedIn: 'root'
})
export class SplashService {

    constructor() {

    }

    inicioApp(): string {
        //aqui iria logica de la app para prepararse a iniciar
        console.log("[SplashService] f inicioApp")
        //todo:  revisar servicio de disponibilidad (bloqueo y modal)
        //todo:  revisar mantenedor (esqueleto) (modal de error)
        //todo:  verifica el estado de logeo:
        //todo:  si no esta logeado: redirigo a ingreso (login)
        //todo:  si esta logeado:
        //todo:  rescatar datos desde persistencia local (usuario,linea,sesion)
        //todo:  ver token de session vencido y renovar si es necesario
        //todo:  validar la version minima de la app (modal)
        //todo:  validar sistema encuesta (modal)
        //todo:  validar notificacion con deeplink (redireccion)
        firebase
            .init()
            .then(() => {
                console.log("[SplashComponent]firebase iniciado")
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
                console.log("[SplashComponent] launchEvent");
                if (args.android) {
                    // For Android applications, args.android is an android.content.Intent class.
                    console.log("[SplashComponent] en Android, intent: " + args.android + ".");
                } else if (args.ios !== undefined) {
                    // For iOS applications, args.ios is NSDictionary (launchOptions).
                    console.log("[SplashComponent] en iOS, options: " + args.ios);
                }
            });

        applicationOn(suspendEvent, (args: ApplicationEventData) => {
                console.log("[SplashComponent] suspendEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashComponent]  Activity: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashComponent] UIApplication: " + args.ios);
                }
            });

        applicationOn(resumeEvent, (args: ApplicationEventData) => {
                console.log("[SplashComponent] resumeEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashComponent] Activity: " + args.android);
                    //validar token si estaba logado
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashComponent] UIApplication: " + args.ios);
                }
            });

        applicationOn(exitEvent, (args: ApplicationEventData) => {
                console.log("[SplashComponent] exitEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashComponent] Activity: " + args.android);
                    if (args.android.isFinishing()) {
                        console.log("[SplashComponent] Activity: " + args.android + " is exiting");
                    } else {
                        console.log("[SplashComponent] Activity: " + args.android + " is restarting");
                    }
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashComponent] UIApplication: " + args.ios);
                }
            });

        applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
                console.log("[SplashComponent] lowMemoryEvent");
                if (args.android) {
                    // For Android applications, args.android is an android activity class.
                    console.log("[SplashComponent] Activity: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is UIApplication.
                    console.log("[SplashComponent] UIApplication: " + args.ios);
                }
            });

        applicationOn(uncaughtErrorEvent, (args: ApplicationEventData) => {
                console.log("[SplashComponent] uncaughtErrorEvent");
                if (args.android) {
                    // For Android applications, args.android is an NativeScriptError.
                    console.log("[SplashComponent] NativeScriptError: " + args.android);
                } else if (args.ios) {
                    // For iOS applications, args.ios is NativeScriptError.
                    console.log("[SplashComponent] NativeScriptError: " + args.ios);
                }
            });

        return "ingreso"
    }


}
