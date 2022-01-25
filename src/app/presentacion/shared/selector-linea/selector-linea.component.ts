import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../dominio/entidades/usuario.service";

@Component({
  selector: 'ns-selector-linea',
  templateUrl: './selector-linea.component.html',
  styleUrls: ['./selector-linea.component.css']
})
export class SelectorLineaComponent implements OnInit {

    private mensaje
  constructor(
      private _usuario:UsuarioService
  ) {
        this.mensaje="Bienvendido"
  }

  ngOnInit(): void {
        this.mensaje="Bienvendido "+this._usuario.obtenerNombre()
  }

}
