import {Injectable} from "@angular/core";

import {rutasLogin, llave, credenciales} from "../Constantes";
import {loginPorCredenciales} from "../interfaces/login/loginRequest";
import {respuestaLogin} from "../interfaces/login/loginResponse";
import {Observable, of} from "rxjs";
import {ProxyHttpclientService} from "../../aplicacion/proxy/proxy.httpclient.service";
import {mergeMap} from "rxjs/operators";

@Injectable({providedIn: 'root',})

export class ApiLoginService {
    private credenciales: loginPorCredenciales
    private respuesta: respuestaLogin

    constructor(private _http: ProxyHttpclientService) {
    }

    IntertarloginConCredenciales(credenciales: loginPorCredenciales): Observable<any> {
        console.log("[api-login] f IntertarloginConCredenciales")
        let respuesta$ = new Observable<respuestaLogin>(observer => {
            this.loginConCredenciales(credenciales).pipe(
                mergeMap(resp2 => this.userAuthorize(resp2)),
                mergeMap(resp3 => this.tokenActivation(resp3))
            ).subscribe(resp => {
                console.dir("[api-login] resp final:" + JSON.stringify(resp))
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
            const rut = credenciales.rut.replace(".", "").replace(".", "")
            const clave = credenciales.clave.replace(/\+/g, '%2B')
            const body = "username=" + rut + "&password=" + clave + "&apikey=" + llave;
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
            this._http.post({url: url, body: body, headers: headers}).subscribe(resp => {
                console.log("[api-login]resp:" + JSON.stringify(resp))
                if (resp.error) {
                    console.log("[api-login]error del tipo :" + resp.tipo)
                    observer.next(resp)
                } else {
                    if (resp.hasOwnProperty('datos')) {
                        if (resp.datos.hasOwnProperty('act_token')) {
                            console.log("[api-login]act_token:" + resp.datos.act_token)
                            observer.next(resp.datos.act_token)
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

    userAuthorize(activacion): Observable<any> {
        console.log("[api-login] f userAuthorize")
        if (activacion.hasOwnProperty('error')) {
            return of(activacion)
        } else {
            let respuesta$ = new Observable(observer => {
                const url = rutasLogin.userAuthorize
                const body = "act_token=" + activacion +
                    "&response_type=code" +
                    "&apikey=" + llave;
                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
                this._http.post({url: url, body: body, headers: headers}).subscribe(resp => {
                    console.log("[api-login]resp:" + JSON.stringify(resp))
                    if (resp.error) {
                        observer.next(resp)
                    } else {
                        if (resp.hasOwnProperty('datos')) {
                            if (resp.datos.hasOwnProperty('code')) {
                                console.log("[api-login]code:" + resp.datos.code)
                                observer.next(resp.datos.code)
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
                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
                this._http.post({url: url, body: body, headers: headers}).subscribe(resp => {
                    if (resp.error) {
                        observer.next(resp)
                    } else {
                        //todo:analizar que deve debolver y que no
                        observer.next(resp)
                    }
                    observer.complete()
                })
            })
            return respuesta$
        }
    }

    updateClientUserContext(agrupado): Observable<any> {
        console.log("[api-login]f updateClientUserContext")
        console.log("[api-login] agrupado:" + JSON.stringify(agrupado))
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
                    observer.next(resp)
                    observer.complete()
                })
            })
            return respuesta$
        }
    }

}
