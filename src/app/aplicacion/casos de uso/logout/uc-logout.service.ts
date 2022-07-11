import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {UsuarioService} from "../../../dominio/entidades/usuario.service";
import {LineaService} from "../../../dominio/entidades/linea.service";
import {SesionService} from "../../../dominio/entidades/sesion.service";
import {ContadorIngresoService} from "../../../dominio/entidades/contador-ingreso.service";

@Injectable({
    providedIn: 'root'
})
export class UcLogoutService {
    constructor(
        private _usuario:UsuarioService,
        private _linea:LineaService,
        private _sesion:SesionService
    ) {
    }
    salir():void{
        this._usuario.borrarDePersistencia()
        this._usuario.limpiarVariableUsuario()
        this._linea.borrarDePersistencia()
        this._linea.limpiarVariableLinea()
        this._sesion.borrarDePersistencia()
        this._sesion.limpiarVariableSesion()
    }
}
