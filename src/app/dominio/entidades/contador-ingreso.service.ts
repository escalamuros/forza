import {Injectable} from '@angular/core';
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service";

@Injectable({
    providedIn: 'root'
})
export class ContadorIngresoService {
    private ingreso: number
    private tiempoDeValidarToken:number

    constructor(private _persistencia: ProxyPersistenciaService) {
        this.tiempoDeValidarToken=0
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

    //estas 2 funciones solo estan para calcular el tiempo de ingreso al validar token de splashService(caso de uso)
    guardarTiempoDeValidarToken(n:number){
        this.tiempoDeValidarToken=n
    }
    obtenerTiempoDeValidarToken():number{
        return this.tiempoDeValidarToken
    }

}
