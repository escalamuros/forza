import { Component, OnInit } from '@angular/core'

import { UsuarioService } from "../../../dominio/entidades/usuario.service"
import { LineaService } from "../../../dominio/entidades/linea.service"
import { SesionService } from "../../../dominio/entidades/sesion.service"
@Component({
  selector: 'ns-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
    public texto2:string
    public texto3:string
    public texto4:string

  constructor(private _usuario:UsuarioService,
              private _linea:LineaService,
              private _sesion:SesionService) {
      console.log("[ResumenComponent] constructor");
      this.texto2=""
      this.texto3=""
      this.texto4=""
   }

  ngOnInit(): void {
      console.log("[ResumenComponent] f ngOnInit");
      this.texto2="rut:"+this._usuario.obtenerRut()
      this.texto3="sesion: "+this._sesion.estaCreada()+',vencida:'+this._sesion.estaVencida()
      this.texto4="linea tipo:"+this._linea.obtenerTipo()+"-Id:"+this._linea.obtenerId()+"-customerId:"+this._linea.obtenerCustomerId()
  }

}
