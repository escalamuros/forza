import { Component, OnInit } from "@angular/core"
import {ModalDialogParams} from "@nativescript/angular"

@Component({
  selector: 'ns-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent implements OnInit {
    public lista:MenuItem[]

  constructor(private _parametros:ModalDialogParams) {
        this.lista=[
            {texto:"resumen",accion:"resumen",activo:false},
            {texto:"perfil",accion:"perfil",activo:false},
            {texto:"cerrar sesion",accion:"cerrar_sesion",activo:false},
            {texto:"cerrar menu",accion:"",activo:false}
        ]
  }

  ngOnInit(): void {
  }

  cerrarModal(respuesta){
      console.log("[MenuModalComponent] f cerrarModal")
      this._parametros.closeCallback(respuesta)
  }

}
 export interface MenuItem{
    texto:string,accion:string,activo:boolean
 }
