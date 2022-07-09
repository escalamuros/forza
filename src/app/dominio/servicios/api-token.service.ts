import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {rutasLogin} from "../Constantes";
import {ProxyHttpclientService} from "../../aplicacion/proxy/proxy.httpclient.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {

    constructor(private _http:ProxyHttpclientService) { }

    updateClientUserContext(agrupado): Observable<any> {
        console.log("[api-token]f updateClientUserContext")
        console.log("[api-token] agrupado:",agrupado)
        if (agrupado.error) {
            return of(agrupado)
        } else {
            let respuesta$ = new Observable(observer => {
                const url = rutasLogin.updateContext
                const customerId = agrupado.customerId
                const body = {
                    customerId: customerId,
                    lo: 'es_CL',
                    sc: 'SS',
                    time: '1544581079034'
                }
                const headers = new HttpHeaders({
                    'Authorization': 'Bearer ' + agrupado.accessToken,
                    'AuthorizationMCSS': agrupado.mcssToken
                })
                this._http.post({url: url, body: body, options:{headers:headers} }).subscribe(resp => {
                    let validacion = this.validarRespuestaUpdateClientUserContext(resp)
                    observer.next(validacion)
                    observer.complete()
                })
            })
            return respuesta$
        }
    }

    validarRespuestaUpdateClientUserContext(resp){
        //todo: que campos deben validarse
        console.log("[api-token] respuesta api updateClientUserContext:", resp)
        return {error:false,datos:resp}
    }

    refrescarToken(refresh): Observable<any>{
        let respuesta$ =  new Observable(observer => {
            let url = rutasLogin.token;
            const body = new HttpParams()
                .set('grant_type', 'refresh_token')
                .set('client_secret','b35328c4-d15b-46e7-b539-57068cc1bd29')
                .set('client_id', '598d51c9-a4c1-40e8-8583-7ee4a3f16abe')
                .set('refresh_token',refresh.refreshToken)
            const httpOptions = {
                headers : new HttpHeaders({}),
                params: {apikey:'53c081ef-ab4b-47b0-95b4-892b2ac7d5f0'}
            };

                this._http.post({url:url, body:body, options:httpOptions}).subscribe((response) => {
                    let resp=this.validarRefreshToken(response)
                    observer.next(resp)
                    observer.complete()
                });
        });
        return respuesta$
    }

    validarRefreshToken(response){
        if (response.error) {
            return (response)
        } else {
            if (response.hasOwnProperty('datos')) {
                if (response.datos.hasOwnProperty('datos')) {
                    if(response.datos.datos.hasOwnProperty("access_token")){
                        let nuevoToken={
                            accessToken:response.datos.datos.access_token,
                            refreshToken:response.datos.datos.refresh_token,
                            expira:response.datos.datos.expires_in,
                            mcssToken:response.datos.datos.mcsstoken
                        }
                        return ({error:false,datos:nuevoToken})
                    } else {
                        return ({error: true, tipo: "respuesta erronea"})
                    }
                } else {
                    return ({error: true, tipo: "respuesta erronea"})
                }
            } else {
                return ({error: true, tipo: "respuesta erronea"})
            }
        }
    }


}
