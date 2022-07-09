import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams} from "@angular/common/http";

import {ProxyHttpclientService} from "../../aplicacion/proxy/proxy.httpclient.service";
import {rutasMantenedor, token, parametrosFlagMantenedor} from "../Constantes";


@Injectable({
    providedIn: 'root'
})
export class ApiMantenedorService {

    constructor(private _http: ProxyHttpclientService) {
    }

    obtenerEntidades(): Observable<any> {
        console.log("[api-mantenedor] f obtenerEntidades")
        let respuesta$ = new Observable(observer => {
            let url = rutasMantenedor.mantenedor
            let headers = new HttpHeaders({'Authorization':'Basic ' + token.coliving_prod})

            this._http.get({url:url,options:{headers:headers}}).subscribe(resp => {
                console.log("[api-mantenedor] repuesta:" + JSON.stringify(resp))
                if (resp.error) {
                    observer.next(resp)
                } else {
                    if (resp.datos.hasOwnProperty('data')) {
                        if (resp.datos.data.hasOwnProperty('Entity')) {
                            observer.next(resp.datos.data.Entity)
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
                if (resp.error) {
                    console.log("[api-mantenedor]error del tipo :" + resp.tipo)
                    if (resp.tipo == 'peticion' || resp.tipo == 'timeout') {
                        observer.next(false)
                    } else {
                        observer.next(resp)
                    }
                } else {
                    console.log("[api-mantenedor]resp flag:" + JSON.stringify(resp))
                    if (resp.datos) {
                        console.log("[api-mantenedor]flag existe:" + resp.datos)
                        observer.next(resp.datos)
                    } else {
                        console.log("[api-mantenedor]flag no existe")
                        observer.next(false)
                    }
                }
                observer.complete()
            })
        })
        return respuesta$
    }

}

