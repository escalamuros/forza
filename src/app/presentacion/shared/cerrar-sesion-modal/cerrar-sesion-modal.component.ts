import { Component, OnInit } from '@angular/core'
import {ModalDialogParams} from "@nativescript/angular"

import {UcDeslogearService} from "../../../aplicacion/casos de uso/deslogear/uc-deslogear.service";

@Component({
  selector: 'ns-cerrar-sesion-modal',
  templateUrl: './cerrar-sesion-modal.component.html',
  styleUrls: ['./cerrar-sesion-modal.component.css']
})
export class CerrarSesionModalComponent implements OnInit {

  constructor(private _parametros:ModalDialogParams,
              private _deslogear:UcDeslogearService) { }

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
