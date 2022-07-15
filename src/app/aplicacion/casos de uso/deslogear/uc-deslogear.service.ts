import { Injectable } from '@angular/core';
import {UsuarioService} from "../../../dominio/entidades/usuario.service";
import {SesionService} from "../../../dominio/entidades/sesion.service";
import {LineaService} from "../../../dominio/entidades/linea.service";
import {ContadorIngresoService} from "../../../dominio/entidades/contador-ingreso.service";
//todo:servicio de contador de inicio
@Injectable({
  providedIn: 'root'
})
export class UcDeslogearService {

  constructor(private _usuario:UsuarioService,
              private _sesion:SesionService,
              private _linea:LineaService,
              private _contador:ContadorIngresoService) { }
    ejecutar(){
        this._linea.borrarDePersistencia()
        this._linea.limpiarVariableLinea()
        this._usuario.borrarDePersistencia()
        this._usuario.limpiarVariableUsuario()
        this._sesion.borrarDePersistencia()
        this._sesion.limpiarVariableSesion()
        this._contador.borrarDePersistencia()
        this._contador.limpiarVariableContador()
    }

}

