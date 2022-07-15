import {Injectable} from "@angular/core";

import {rutasLogin, llave, credenciales} from "../Constantes";
import {loginPorCredenciales} from "../interfaces/login/loginRequest";
import {respuestaLogin} from "../interfaces/login/loginResponse";
import {Observable, of} from "rxjs";
import {ProxyHttpclientService, respuestaHttp} from "../../aplicacion/proxy/proxy.httpclient.service";
import {mergeMap} from "rxjs/operators";
import {HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root',})

export class ApiLoginService {
    private credenciales: loginPorCredenciales
    private respuesta: respuestaLogin

    constructor(private _http: ProxyHttpclientService) {
    }

    intertarLoginConCredenciales(credenciales: loginPorCredenciales): Observable<any> {
        console.log("[api-login] f IntertarloginConCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer => {
            this.loginConCredenciales(credenciales).pipe(
                mergeMap(resp2 => this.userAuthorize(resp2)),
                mergeMap(resp3 => this.tokenActivation(resp3))
            ).subscribe(resp => {
                console.dir("[api-login] resp final:" + JSON.stringify(resp))
                //todo: validador antes de pasar a el CU
                observer.next(resp)
                observer.complete()
            })
        })
        return respuesta$
    }

    loginConCredenciales(credenciales: loginPorCredenciales): Observable<any> {
        console.log("[api-login] f loginConCredenciales")
        let respuesta$ = new Observable(observer => {
            const url = rutasLogin.loginCajetin
            const rut = credenciales.rut.replace(/[.]/g, "")
            const clave = credenciales.clave.replace(/\+/g, '%2B')
            const body = "username=" + rut + "&password=" + clave + "&apikey=" + llave;
            const headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
            this._http.post({url: url, body: body,options:{ headers: headers}})
                .subscribe(resp => {
                console.log("[api-login]resp:" + JSON.stringify(resp))
                let respuestaAnalizada=this.validarRespuestaLoginConCredenciales(resp)
                observer.next(respuestaAnalizada)
                observer.complete()
            })
        })
        return respuesta$
    }

    validarRespuestaLoginConCredenciales(resp):respuestaHttp{
        if (resp.error) {
            console.log("[api-login]error del tipo :" + resp.tipo)
            return (resp)
        } else {
            if (resp.hasOwnProperty('datos')) {
                if (resp.datos.hasOwnProperty('datos')) {
                    if (resp.datos.datos.hasOwnProperty('act_token')) {
                        console.log("[api-login]act_token:" + resp.datos.datos.act_token)
                        return {error:false,datos:resp.datos.datos.act_token}
                    } else {
                        return {error: true, tipo: "respuesta erronea"}
                    }
                } else {
                    return {error: true, tipo: "respuesta erronea"}
                }
            } else {
                return {error: true, tipo: "respuesta erronea"}
            }
        }
    }

    userAuthorize(activacion): Observable<any> {
        console.log("[api-login] f userAuthorize")
        console.log("[api-login] datos:",activacion)
        if (activacion.error) {
            return of(activacion)
        } else {
            let respuesta$ = new Observable(observer => {
                const url = rutasLogin.userAuthorize
                const body = "act_token=" + activacion.datos +
                    "&response_type=code" +
                    "&apikey=" + llave;
                const headers = new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                })
                this._http.post({url: url, body: body, options:{headers: headers}})
                    .subscribe(resp => {
                        console.log("[api-login]resp:" + JSON.stringify(resp))
                        let respuestaAnalizada=this.validarRespuestaUserAuthorize(resp)
                        observer.next(respuestaAnalizada)
                        observer.complete()
                })
            })
            return respuesta$
        }
    }

    validarRespuestaUserAuthorize(resp){
        if (resp.error) {
            return (resp)
        } else {
            if (resp.hasOwnProperty('datos')) {
                if (resp.datos.hasOwnProperty('datos')) {
                    if (resp.datos.datos.hasOwnProperty('code')) {
                        console.log("[api-login]code:" + resp.datos.datos.code)
                        return (resp.datos.datos.code)
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

    tokenActivation(code): Observable<any> {
        console.log("[api-login] f tokenActivation")
        if (code.error) {
            return of(code)
        } else {
            let respuesta$ = new Observable(observer => {
                const url = rutasLogin.token
                const body = "client_id=" + credenciales.client_id +
                    "&client_secret=" + credenciales.client_secret +
                    "&code=" + code +
                    "&redirect_uri=" + credenciales.redirect_uri +
                    "&grant_type=" + credenciales.grant_type
                const headers =  new HttpHeaders( {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                })
                this._http.post({url: url, body: body, options:{headers: headers}})
                    .subscribe(resp => {
                        console.log("[api-login]resp:" + JSON.stringify(resp))
                        let respuestaAnalizada=this.validarRespuestaTokenActivation(resp)
                        observer.next(respuestaAnalizada)
                        observer.complete()
                    })
            })
            return respuesta$
        }
    }

    validarRespuestaTokenActivation(resp){
        if (resp.error) {
            return (resp)
        } else {
            if(resp.datos.hasOwnProperty("access_token")){
                return ({error:false,datos:resp.datos})
            }else{
                return ({error:true,datos:"campos no encontrados"})
            }
        }
    }

    intentarLoginPorLinea(){
        
    }

}
