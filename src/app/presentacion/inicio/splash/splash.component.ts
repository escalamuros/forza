import { Component, OnInit } from '@angular/core'
import {RouterExtensions} from "@nativescript/angular"
import { Page } from "tns-core-modules/ui/page"

import { SplashService } from "../../../aplicacion/casos de uso/inicio/splash/splash.service";

@Component({
  selector: 'ns-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private _enrrutador:RouterExtensions,
              private _splash:SplashService,
              private _page:Page) {
      this._page.actionBarHidden=true
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
          if(ruta==="resumen"){
              this._enrrutador.navigate(["resumen"])
          }
          if(ruta==="registrar_linea"){
              this._enrrutador.navigate(["ingreso"])
          }
      },2000)
  }
}

