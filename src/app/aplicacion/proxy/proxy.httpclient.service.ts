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

    get(parametros): Observable<any> {
        let res: Observable<any>
        res = this._http.get(parametros.url).pipe(
            catchError(err => this.errorApi(err)),
            timeout(30000)
        )
        return res
    }

    post(parametros): Observable<any> {
        console.log("[ProxyHttpclientService]f post")
        console.log("[ProxyHttpclientService]parametros.url:"+parametros.url)
        console.log("[ProxyHttpclientService]parametros.body:"+parametros.body)
        let  opciones=parametros.options
        opciones.headers=new HttpHeaders(opciones.headers)
        let respuesta$: Observable<any>
        respuesta$ = this._http.post(parametros.url,parametros.body,opciones).pipe(
            timeout(30000),
            catchError(err => this.errorApi(err))

        )
        return respuesta$
    }

    errorApi(err) {
        console.log("[ProxyHttpclientService] error en api")
        console.log("[ProxyHttpclientService] error:"+JSON.stringify(err))
        let tipo:string="desconocido"
        if(err.name==="TimeoutError"){
            tipo="timeout"
        }
        if (err.status == "400"||err.status == "404"||err.status == "401") {
            console.log("[ProxyHttpclientService] error 400")
            tipo="peticion"
        } else if(err.status =="500"){
            console.log("[ProxyHttpclientService] error 500")
            tipo="servidor"
        } else {
            console.log("[ProxyHttpclientService]error desconosido en servicio")
        }
        return of({estado: "error", tipo: tipo})
    }

}


