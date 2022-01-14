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

