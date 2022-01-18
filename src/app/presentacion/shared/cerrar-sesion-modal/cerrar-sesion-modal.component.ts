import { Component, OnInit } from '@angular/core'
import {ModalDialogParams} from "@nativescript/angular"

import {DeslogearService} from "../../../aplicacion/casos de uso/deslogear/deslogear.service";

@Component({
  selector: 'ns-cerrar-sesion-modal',
  templateUrl: './cerrar-sesion-modal.component.html',
  styleUrls: ['./cerrar-sesion-modal.component.css']
})
export class CerrarSesionModalComponent implements OnInit {

  constructor(private _parametros:ModalDialogParams,
              private _deslogear:DeslogearService) { }

  ngOnInit(): void {
  }

  //debe responder una de 3 cosas: "ok","error","nada"
    cerrarModal(){
      this._parametros.closeCallback("")
    }

    deslogear(){
      this._deslogear.ejecutar()
      this._parametros.closeCallback("ok")
    }

}
