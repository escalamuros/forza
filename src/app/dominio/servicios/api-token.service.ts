import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {rutasLogin} from "../Constantes";
import {ProxyHttpclientService} from "../../aplicacion/proxy/proxy.httpclient.service";

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {

    constructor(private _http:ProxyHttpclientService) { }

    updateClientUserContext(agrupado): Observable<any> {
        console.log("[api-token]f updateClientUserContext")
        console.log("[api-token] agrupado:" + JSON.stringify(agrupado))
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
                const headers = {
                    'Authorization': 'Bearer ' + agrupado.accessToken,
                    'AuthorizationMCSS': agrupado.mcssToken
                }
                this._http.post({url: url, body: body, headers: headers}).subscribe(resp => {
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
        console.log("[api-token] respuesta api", + resp)
        return resp
    }

    refrescarToken(refresh){
        let respuesta$ =  new Observable(obs => {
            let url = rutasLogin.token;
            let body;
            body = {grant_type: 'refresh_token',
                client_secret: 'b35328c4-d15b-46e7-b539-57068cc1bd29',
                client_id: '598d51c9-a4c1-40e8-8583-7ee4a3f16abe',
                refresh_token: refresh.refreshToken };
            const httpOptions = {
                headers : {
                    'Authorization': 'Bearer ' + refresh.accessToken,
                    'AuthorizationMCSS': refresh.mcssToken
                },
                params: { apikey: '53c081ef-ab4b-47b0-95b4-892b2ac7d5f0' }
            };

                this._http.post({url:url, body:body, headers:httpOptions}).subscribe((response) => {
                    let resp={error:false,datos:response}
                    obs.next(resp);
                });
        });
        return respuesta$
    }


}
