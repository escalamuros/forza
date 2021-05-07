import { Component, OnInit } from '@angular/core';
import {RouterExtensions} from "@nativescript/angular";

import * as firebase from "nativescript-plugin-firebase";

@Component({
  selector: 'ns-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private enrrutador:RouterExtensions) { }

  ngOnInit(): void {
      //esto es para que se vea durante el arranque
      firebase
          .init()
          .then(()=>{console.log("[SplashComponent]firebase iniciado")})
      setTimeout(()=>{ this.enrrutador.navigate(["ingreso"])},2000)
  }

}
