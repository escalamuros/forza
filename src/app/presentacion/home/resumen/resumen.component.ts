import { Component, OnInit,ViewContainerRef } from '@angular/core'
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular'

import { MenumodalComponent } from "../../shared/menumodal/menumodal.component"
import { UsuarioService } from "../../../dominio/entidades/usuario.service"
import { LineaService } from "../../../dominio/entidades/linea.service"

@Component({
  selector: 'ns-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
    public texto1:string
    public texto2:string
    public texto3:string
    public texto4:string


  constructor(private _modalService: ModalDialogService,
              private _vcRef: ViewContainerRef,
              private _usuario:UsuarioService,
              private _linea:LineaService) {
      this.texto1="Bienvenido "
      this.texto2=""
      this.texto3=""
      this.texto4=""

  }

  ngOnInit(): void {
      this.texto1=this.texto1+this._usuario.obtenerNombre()
      this.texto2="rut:"+this._usuario.obtenerRut()
      this.texto3="linea tipo:"+this._linea.obtenerTipo()+"-Id:"+this._linea.obtenerId()+"-customerId:"+this._linea.obtenerCustomerId()
      this.texto4=""
  }

  abrirMenuModal(){
      const opciones: ModalDialogOptions = {
          viewContainerRef: this._vcRef,
          context: {},
          fullscreen: true
      };

      this._modalService.showModal(MenumodalComponent, opciones)
          .then((resultado: string) => {
              console.log("[ResumenComponent] accion menu modal: "+resultado);
          });
  }

}
