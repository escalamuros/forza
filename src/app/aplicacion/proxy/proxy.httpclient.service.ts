import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders,HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, timeout} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class ProxyHttpclientService {

    constructor(private _http: HttpClient) {
    }

    get(peticion): Observable<any> {
        console.log("[ProxyHttpclientService]f get")
        console.log("[ProxyHttpclientService]parametros.url:"+peticion.url)
        let respuesta$: Observable<any>
        respuesta$ = this._http.get(peticion.url,peticion).pipe(
            catchError(err => this.errorApi(err)),
            timeout(30000)
        )
        return respuesta$
    }

    post(parametros): Observable<any> {
        console.log("[ProxyHttpclientService]f post")
        console.log("[ProxyHttpclientService]parametros.url:"+parametros.url)
        console.log("[ProxyHttpclientService]parametros.body:"+parametros.body)
        const headers=new HttpHeaders(parametros.headers)
        let respuesta$: Observable<any>
        respuesta$ = this._http.post(parametros.url,parametros.body,{headers:headers}).pipe(
            timeout(30000),
            catchError(err => this.errorApi(err))
        )
        return respuesta$
    }

    errorApi(err) {
        console.log("[ProxyHttpclientService] f errorApi")
        console.log("[ProxyHttpclientService] error:"+JSON.stringify(err))
        let tipo:string="desconocido"
        if(err.name==="TimeoutError"){
            tipo="timeout"
        }else{
            if (err.status == "400"||err.status == "404"||err.status == "401") {
                console.log("[ProxyHttpclientService] error 400")
                tipo="peticion"
            } else if(err.status =="500"||err.status =="503"){
                console.log("[ProxyHttpclientService] error 500")
                tipo="servidor"
            } else {
                console.log("[ProxyHttpclientService]error desconosido en servicio")
            }
        }
        return of({error: "true", tipo: tipo})
    }

}


