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
            let parametros = {url: "", headers: {}}
            parametros.url = rutasMantenedor.mantenedor
            parametros.headers = new HttpHeaders().set('Authorization', 'Basic ' + token.coliving_prod)
            console.log("[api-mantenedor] parametros:" + JSON.stringify(parametros))
            this._http.get(parametros).subscribe(resp => {
                console.log("[api-mantenedor] repuesta:" + JSON.stringify(resp))
                if (resp.error) {
                    observer.next(resp)
                } else {
                    if (resp.hasOwnProperty('data')) {
                        if (resp.data.hasOwnProperty('Entity')) {
                            observer.next(resp.data.Entity)
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
            let parametros = {url: "", headers: {}, params: {}}
            parametros.url = rutasMantenedor.flag
            parametros.params = new HttpParams()
                .set('apikey', parametrosFlagMantenedor.apikey)
                .set('consumer', parametrosFlagMantenedor.consumer)
                .set('maintainer', parametrosFlagMantenedor.maintainer)
            parametros.headers = new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Authorization', 'Basic ' + token.redis)
            console.log("[api-mantenedor] parametros:" + JSON.stringify(parametros))
            this._http.get(parametros).subscribe(resp => {
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

