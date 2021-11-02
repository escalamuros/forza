import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../dominio/entidades/usuario.service";

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


  constructor(private _usuario:UsuarioService) {
      this.texto1="Bienvenido "
      this.texto2=""
      this.texto3=""
      this.texto4=""

  }

  ngOnInit(): void {
      this.texto1=this.texto1+this._usuario.obtenerNombre()
      this.texto2="rut:"+this._usuario.obtenerRut()
      this.texto3="linea tipo:"+this._usuario.obtenerTipoLinea()+"-Id:"+this._usuario.obtenerIdLinea()+"-customerId:"+this._usuario.obtenerCustomerIdLinea()
      this.texto4=this._usuario.obtenerLinea()
  }

}
