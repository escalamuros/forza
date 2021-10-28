import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from "@nativescript/angular";

import { SplashService } from "../../../aplicacion/casos de uso/inicio/splash/splash.service";

import * as firebase from "nativescript-plugin-firebase";

@Component({
  selector: 'ns-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private enrrutador:RouterExtensions,
              private _splash:SplashService) { }

  ngOnInit(): void {
      console.log("[SplashComponent] f ngOnInit");
      //esto es para que se vea durante el arranque
      //aqui iria logica de la app para prepararse a iniciar
      firebase
          .init()
          .then(()=>{console.log("[SplashComponent]firebase iniciado")})
      setTimeout(()=>{ this.enrrutador.navigate(["ingreso"])},2000)
  }

}
