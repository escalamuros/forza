import { Injectable } from '@angular/core';
import {UsuarioService} from "../../../dominio/entidades/usuario.service";
import {SesionService} from "../../../dominio/entidades/sesion.service";
import {LineaService} from "../../../dominio/entidades/linea.service";
//todo:servicio de contador de inicio
@Injectable({
  providedIn: 'root'
})
export class DeslogearService {

  constructor(private _usuario:UsuarioService,
              private _sesion:SesionService,
              private _linea:LineaService) { }
    ejecutar(){
        this._linea.borrarDePersistencia()
        this._linea.limpiarVariableLinea()
        this._usuario.borrarDePersistencia()
        this._usuario.limpiarVariableUsuario()
        this._sesion.borrarDePersistencia()
        this._sesion.limpiarVariableSesion()
    }

}

