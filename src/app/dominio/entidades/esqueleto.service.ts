import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service"
import {ApiMantenedorService} from "../servicios/api-mantenedor.service"
import {entidad} from "../interfaces/esqueleto/esqueleto"


@Injectable({
    providedIn: 'root'
})
export class EsqueletoService {
    private entidades: entidad[]
    private fechaUltimaActualizacion

    constructor(
        private _mantenedor: ApiMantenedorService,
        private _persistencia: ProxyPersistenciaService
    ) {
        this.entidades = []
    }

    forzarEsqueletoDesdeApi(){
        let respuesta$=new Observable(observer=>{
            this._mantenedor.obtenerFlagDeForzado().subscribe(res=>{
                if(res.error===true){
                    observer.next({estado:"nook"})
                }else{
                    observer.next(res)
                }
                observer.complete()
            })
        })
        return respuesta$
    }

    rescatarEntidadesDesdeApi(){
        let respuesta$=new Observable(observer=>{
            this._mantenedor.obtenerEntidades().subscribe(res=>{
                console.log("llega entidades:"+JSON.stringify(res[0]))
                if(res.error===true){
                    observer.next({estado:"nook"})
                }else{
                    this.entidades=res.map(elemento=>{ return {nombre:elemento.nombre,valor:elemento.caracteristicas[0].caracteristica.valor}})
                    console.log("la entidad 0:"+JSON.stringify(this.entidades[0]))
                    this.guardarEnPersistencia()
                    observer.next({estado:"ok"})
                }
                observer.complete()
            })
        })
        return respuesta$
    }

    obternerEntidad(nombre): entidad {
        const entidad = this.entidades.find(elemento => {
            elemento.nombre === nombre
        })
        if (typeof entidad !== "undefined") {
            return entidad
        }
        return {nombre: 'error', valor: "entidad no encontrada"}
    }

    rescatarDePersistencia() {
        if (this._persistencia.existe("entidades")) {
            this.entidades = this._persistencia.obtener("entidades")
        } else {
            this.entidades = []
        }
        if(this._persistencia.existe("fechaMantenedor")){
            this.fechaUltimaActualizacion = this._persistencia.obtener("fechaMantenedor")
        }
    }

    mantenedorExiste(){
        if(typeof this.fechaUltimaActualizacion!=="undefined"){
            return true
        }
        return false
    }

    mantenedorMuyViejo(){
        let FechaHoy= new Date()
        let FechaMantenedor = new Date(this.fechaUltimaActualizacion)
        FechaMantenedor.setDate(FechaMantenedor.getDate()+1)
        console.log("fecha mantenendor + 1 :"+FechaMantenedor)
        console.log("fecha de hoy          :"+FechaHoy)
        if(FechaMantenedor>FechaHoy){return "vivo"}
        else{return "vencido"}
    }

    guardarEnPersistencia() {
        this._persistencia.guardar("entidades", this.entidades)
        let fecha = new Date()
        this._persistencia.guardar("fechaMantenedor",fecha)
        this.fechaUltimaActualizacion=fecha
    }

    borrarDePersistencia() {
        this._persistencia.limpiar("entidades")
        this._persistencia.limpiar("fechaMantenedor")
    }

    limpiarVariableEntidades() {
        this.entidades = []
        this.fechaUltimaActualizacion=null
    }

}
