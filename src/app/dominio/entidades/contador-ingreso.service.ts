import {Injectable} from '@angular/core';
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service";

@Injectable({
    providedIn: 'root'
})
export class ContadorIngresoService {
    private ingreso: number

    constructor(private _persistencia: ProxyPersistenciaService) {
        this.obtenerDePersistencia()
    }

    iniciarConteo() {
        this.ingreso = 0
    }

    aumentarContador() {
        //para evitar que el contador se desvorde
        if (this.ingreso == 2000000) {
            this.ingreso = 0
        }
        this.ingreso++
        this.guardarEnPersistencia()
    }

    obtenerContador() {
        return this.ingreso
    }

    guardarEnPersistencia() {
        this._persistencia.guardar("contadorIngreso", this.ingreso)
    }

    obtenerDePersistencia() {
        if (this._persistencia.existe("contadorIngreso")) {
            this.ingreso = this._persistencia.obtener("contadorIngreso")
        } else {
            this.ingreso = 0
        }
    }

    borrarDePersistencia() {
        this._persistencia.limpiar("contadorIngreso")
    }

    limpiarVariableContador() {
        this.ingreso = 0
    }

}
