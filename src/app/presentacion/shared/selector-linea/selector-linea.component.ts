import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../dominio/entidades/usuario.service";
import {LineaService} from "../../../dominio/entidades/linea.service";

@Component({
  selector: 'ns-selector-linea',
  templateUrl: './selector-linea.component.html',
  styleUrls: ['./selector-linea.component.css']
})
export class SelectorLineaComponent implements OnInit {

    private mensaje:string
    private canOpenModal:boolean
    private selectorFontSize:number
    private monolinea:boolean
    private formateoTipoDeLinea:string
    private numeroLinea:string
    private openedModal:boolean
  constructor(
      private _usuario:UsuarioService,
      private _linea:LineaService
  ) {
        this.mensaje="Bienvendido"
      this.canOpenModal=false
      this.selectorFontSize=14
      this.monolinea=true
      this.openedModal=false
  }

  ngOnInit(): void {
      this.formateoTipoDeLinea=this.formatearTipoLinea()
      this.numeroLinea = this._linea.obtenerId()
      this.mensaje=this.saludoSegunHora()+" "+this.formatearNombre()
  }

  saludoSegunHora():string{
      let date = new Date();
      let hour = date.getHours();
      if (hour >= 6 && hour < 12) {
          return "Buenos días";
      } else if (hour >= 12 && hour < 20 ) {
          return "Buenas tardes";
      } else if ((hour >= 20 && hour < 24) || hour < 6) {
          return "Buenas noches";
      } else { }
  }

  formatearNombre():string{
        let nombre=this._usuario.obtenerNombre()
        nombre=nombre.split(" ")[0]
        nombre=nombre.toLowerCase()
        nombre=nombre.charAt(0).toUpperCase() + nombre.slice(1);
        return nombre
    }

  formatearTipoLinea():string{
      const tipoContrato=this._linea.obtenerTipoContratoOri()
      console.log("[SelectorLineaComponent] linea:",tipoContrato)
      switch(tipoContrato){
          case "Contrato":
          case "Postpago":
              return "Plan Móvil"
              break
          case "Control":
              return "Plan Móvil Salta"
              break
          case "Hibrido":
              return "Plan Móvil Control"
              break
          case "Fija":
          case "Fijo":
          case "FijaMig":
              return "Plan Hogar"
              break
          case "Prepago":
              return "Prepago"
              break
          default:
              return"Desconosido"
              break
          }
  }

    abrirSelectorDeLineas(){

    }

}
