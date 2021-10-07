import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ProxyHttpclientService} from "../../aplicacion/proxy/proxy.httpclient.service";

@Injectable({providedIn:'root',})

export class ApiGatosService {

    constructor(private http:ProxyHttpclientService){
    }

    obtenerGatoRemoto():Observable<any>{
        console.log("[APIGatosService]f obtenerGatoRemoto")
        let res:Observable<any>
        res = this.http.get("https://api.thecatapi.com/v1/images/search")
        return res
    }

}
