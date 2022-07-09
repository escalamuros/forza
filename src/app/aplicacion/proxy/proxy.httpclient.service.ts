import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders,HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, timeout} from "rxjs/operators";

@Injectable({ providedIn: 'root'})

export class ProxyHttpclientService {
    constructor(private _http: HttpClient) {
    }
    get(parametros:peticionHttp): Observable<respuestaHttp> {
        console.log("[ProxyHttpclientService]f get")
        console.log("[ProxyHttpclientService]parametros.url:",parametros.url)
        let respuesta$: Observable<any>
        respuesta$ = this._http.get(parametros.url,parametros.options).pipe(
            catchError(err => this.errorApi(err)),
            timeout(30000),
            map((obj:any)=>{
                console.log("[ProxyHttpclientService] pipe map:",obj)
                if((obj.hasOwnProperty("error"))&&(obj.error==true)){
                    console.log("[ProxyHttpclientService] hay error capturado")
                    return {error:true,datos:obj.tipo}
                }else{
                    console.log("[ProxyHttpclientService] no hay error capturado")
                    return {error:false,datos:obj}
                }
            })
        )
        return respuesta$
    }

    post(parametros:peticionHttp): Observable<respuestaHttp> {
        console.log("[ProxyHttpclientService]f post")
        console.log("[ProxyHttpclientService]parametros.url:",parametros.url)
        console.log("[ProxyHttpclientService]parametros.body:",parametros.body)

        let respuesta$: Observable<any>
        respuesta$ = this._http.post(parametros.url,parametros.body,parametros.options).pipe(
            catchError(err => this.errorApi(err)),
            timeout(30000),
            map((obj:any)=>{
                console.log("[ProxyHttpclientService] pipe map:",obj)
                if(obj.hasOwnProperty("error") && obj.hasOwnProperty("tipo")){
                    console.log("[ProxyHttpclientService] hay error capturado")
                    return {error:true,datos:obj.tipo}
                }else{
                    console.log("[ProxyHttpclientService] NO hay error capturado")
                    return {error:false,datos:obj}
                }
            })
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
        let resp:respuestaHttp={error:true,tipo:tipo}
        return of(resp)
    }
}

export interface peticionHttp{
    url:string,
    body?:any,
    options: { headers?:HttpHeaders,params?:HttpParams | any  }
}

export interface respuestaHttp{
    error:boolean;
    tipo?:string;
    datos?:any;
}

