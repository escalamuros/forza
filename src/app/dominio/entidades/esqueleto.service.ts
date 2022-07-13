import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service"
import {ApiMantenedorService} from "../servicios/api-mantenedor.service"
import {entidad} from "../interfaces/esqueleto/esqueleto"


@Injectable({
    providedIn: 'root'
})
export class EsqueletoService {
    public entidades: entidad[]
    private fechaUltimaActualizacion

    constructor(
        private _mantenedor: ApiMantenedorService,
        private _persistencia: ProxyPersistenciaService
    ) {
        this.entidades = []
    }

    forzarEsqueletoDesdeApi(){
        console.log("[EsqueletoService] f forzarEsqueletoDesdeApi")
        let respuesta$=new Observable(observer=>{
            this._mantenedor.obtenerFlagDeForzado().subscribe(res=>{
                console.log("[EsqueletoService] resp:",res)
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

    rescatarEntidadesDesdeApi():Observable<respuestaEstado>{
        console.log("[EsqueletoService] f rescatarEntidadesDesdeApi")
        let respuesta$=new Observable<respuestaEstado>(observer=>{
            this._mantenedor.obtenerEntidades().subscribe(res=>{
                //console.log("[EsqueletoService] llega entidades:",res)
                let respEstado:respuestaEstado
                if(res.error===true){
                    respEstado={estado:"nook"}
                    observer.next(respEstado)
                }else{
                    this.entidades=res.datos.map(elemento=>{ return {nombre:elemento.nombre,valor:elemento.caracteristicas[0].caracteristica.valor}})
                    //todo:cambiar el formato de los datos de las entidades
                    this.guardarEnPersistencia()
                    respEstado={estado:"ok"}
                    observer.next(respEstado)
                }
                observer.complete()
            })
        })
        return respuesta$
    }

    obternerEntidad2(nombre): entidad {
        const entidad = this.entidades.find(elemento => {
            elemento.nombre === nombre
        })
        if (typeof entidad !== "undefined") {
            return entidad
        }
        return {nombre: 'error', valor: "entidad no encontrada en mantenedor cacheado"}
    }
    obternerEntidad(nombre): entidad {
        let entidad
        this.entidades.forEach(elemento => {
            //console.log("[EsqueletoService] forEach:",elemento.nombre )
            if(elemento.nombre === nombre){
                entidad=elemento
            }
        })
        if (typeof entidad !== "undefined") {
            return entidad
        }
        return {nombre: 'error', valor: "entidad no encontrada en mantenedor cacheado"}
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

export interface respuestaEstado{
    estado:string
}
