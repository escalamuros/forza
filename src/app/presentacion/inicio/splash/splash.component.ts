import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from "@nativescript/angular";
import * as firebase from "nativescript-plugin-firebase";
import {
    on as applicationOn,
    ApplicationEventData,
    exitEvent,
    launchEvent,
    lowMemoryEvent,
    resumeEvent,
    suspendEvent,
    uncaughtErrorEvent
} from "tns-core-modules/application";

import { SplashService } from "../../../aplicacion/casos de uso/inicio/splash/splash.service";

@Component({
  selector: 'ns-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private _enrrutador:RouterExtensions,
              private _splash:SplashService) {
      console.log("[SplashComponent] constructor");
  }

  ngOnInit(): void {
      console.log("[SplashComponent] f ngOnInit");
      const ruta= this._splash.inicioApp()
      //esto es para que se vea durante el arranque

      setTimeout(()=>{
          if(ruta==="ingreso"){
            this._enrrutador.navigate(["ingreso"])
          }
      },2000)
  }
}
/*
applicationOn(launchEvent, (args: ApplicationEventData) => {
    console.log("[SplashComponent] launchEvent");
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("[SplashComponent] Launched Android application with the following intent: " + args.android + ".");
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("[SplashComponent] Launched iOS application with options: " + args.ios);
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
});*/
