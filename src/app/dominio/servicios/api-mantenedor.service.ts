import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpHeaders, HttpParams} from "@angular/common/http";

import {ProxyHttpclientService, respuestaHttp} from "../../aplicacion/proxy/proxy.httpclient.service";
import {rutasMantenedor, token, parametrosFlagMantenedor,nombreIdEntidadesMantenedor} from "../Constantes";


@Injectable({
    providedIn: 'root'
})
export class ApiMantenedorService {

    constructor(private _http: ProxyHttpclientService) {
    }

    obtenerEntidades(): Observable<respuestaHttp> {
        console.log("[api-mantenedor] f obtenerEntidades")
        let respuesta$ = new Observable<respuestaHttp>(observer => {
            let url = rutasMantenedor.mantenedor
            let headers = new HttpHeaders({'Authorization':'Basic ' + token.coliving_prod})

            this._http.get({url:url,options:{headers:headers}}).subscribe(resp => {
                console.log("[api-mantenedor] repuesta:" + JSON.stringify(resp))
                let respuesta:respuestaHttp
                respuesta=this.validarObtenerEntidades(resp)
                observer.next(respuesta)
                observer.complete()
            })
        })
        return respuesta$
    }

    validarObtenerEntidades(respuesta){
        if (respuesta.error) {
            return respuesta
        } else {
            if (respuesta.datos.hasOwnProperty('data')) {
                if (respuesta.datos.data.hasOwnProperty('Entity')) {
                    return {error:false, datos:respuesta.datos.data.Entity}
                } else {
                    return {error: true, tipo: "respuesta erronea,no hay entidades"}
                }
            } else {
                return {error: true, tipo: "respuesta erronea,no hay data"}
            }
        }
    }

    obtenerEntidad(nombreEntidad:string): Observable<respuestaHttp> {
        console.log("[api-mantenedor] f obtenerEntidad")
        let respuesta$
        let idEntidad:string=nombreIdEntidadesMantenedor[nombreEntidad]
        if(typeof idEntidad !== "undefined"){
            respuesta$ = of({error: true, tipo: "respuesta erronea"})
            return respuesta$
        }
        respuesta$ = new Observable<respuestaHttp>(observer => {
            let url = rutasMantenedor.mantenedor
            let headers = new HttpHeaders({'Authorization':'Basic ' + token.coliving_prod})

            this._http.get({url:url,options:{headers:headers}}).subscribe(resp => {
                console.log("[api-mantenedor] repuesta:" + JSON.stringify(resp))
                if (resp.error) {
                    observer.next(resp)
                } else {
                    if (resp.datos.hasOwnProperty('data')) {
                        if (resp.datos.data.hasOwnProperty('Entity')) {
                            observer.next({error: false,datos:resp.datos.data.Entity})
                        } else {
                            observer.next({error: true, tipo: "respuesta erronea"})
                        }
                    } else {
                        observer.next({error: true, tipo: "respuesta erronea"})
                    }
                }
                observer.complete()
            })
        })
        return respuesta$
    }

    obtenerFlagDeForzado(): Observable<any> {
        console.log("[api-mantenedor] f obtenerFlagDeForzado")
        let respuesta$ = new Observable(observer => {
            let url = rutasMantenedor.flag
            let params = new HttpParams()
                .set('apikey', parametrosFlagMantenedor.apikey)
                .set('consumer', parametrosFlagMantenedor.consumer)
                .set('maintainer', parametrosFlagMantenedor.maintainer)
            let headers = new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Authorization', 'Basic ' + token.redis)
            this._http.get({url:url,options:{headers:headers,params:params}}).subscribe(resp => {
                let validacion:boolean= this.validarObtenerFlagDeForzado(resp)
                observer.next(validacion)
                observer.complete()
            })
        })
        return respuesta$
    }

    validarObtenerFlagDeForzado(respuesta):boolean{
        console.log("[api-mantenedor] f validarObtenerFlagDeForzado")
        console.log("[api-mantenedor] respuesta:",respuesta)
        if (respuesta.error) {
            return false
        } else {
            if (respuesta.hasOwnProperty("datos")) {
                if(respuesta.datos==true||respuesta.datos==false)
                {return respuesta.datos}else{return false}
            } else {
                return false
            }
        }
    }

}

