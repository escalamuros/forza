import { Component, OnInit,ViewContainerRef } from '@angular/core'
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from '@nativescript/angular'

import { MenuModalComponent } from "../../shared/menu-modal/menu-modal.component"
import{CerrarSesionModalComponent} from "../../shared/cerrar-sesion-modal/cerrar-sesion-modal.component"
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
              private _enrrutador:RouterExtensions,
              private _vcRef: ViewContainerRef,
              private _usuario:UsuarioService,
              private _linea:LineaService) {
      console.log("[ResumenComponent] constructor");
      this.texto1="Bienvenido "
      this.texto2=""
      this.texto3=""
      this.texto4=""
   }

  ngOnInit(): void {
      console.log("[ResumenComponent] f ngOnInit");
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

      this._modalService.showModal(MenuModalComponent, opciones)
          .then((resultado: string) => {
              console.log("[ResumenComponent] accion menu modal: "+resultado);

              //posible timeout por el movimiento-desaparicion del modal
              setTimeout(()=>{this.redirigir(resultado)},50)

          });
  }

  redirigir(resultado){
      if(resultado===""){
          console.log("[ResumenComponent] cierro modal")
      }
      if(resultado==="cerrar_sesion"){
          this.abrirModalDeCerrarSesion()
      }
      else{
          this._enrrutador.navigate([resultado])
      }
  }
  abrirModalDeCerrarSesion(){
      const opciones: ModalDialogOptions = {
          viewContainerRef: this._vcRef,
          context: {},
          fullscreen: true
      };

      this._modalService.showModal(CerrarSesionModalComponent, opciones)
          .then((resultado: string) => {
              console.log("[ResumenComponent] accion cerrar sesion modal: "+resultado);

              //posible timeout por el movimiento-desaparicion del modal
              setTimeout(()=>{
                  this.salirONada(resultado)
              },50)

          });
  }

  salirONada(res){
        if(res==="ok"){
            this._enrrutador.navigate(["ingreso"])
        }
  }

}
