import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({providedIn:'root',})

export class ApiGatosService {

    constructor(private http:HttpClient){
    }

    obtenerGatoRemoto():Observable<any>{
        let res:Observable<any>
        res = this.http.get("https://api.thecatapi.com/v1/images/search").pipe(
            catchError(err=>this.errorObtenerGato(err))
        )
        return res
    }

    errorObtenerGato(err){
        console.log("error en servicio")
        if(err.status=="400"){
            console.log("mala URL del servicio")
        }else{
            console.log("error desconosido en servicio")
        }
        return of({url:"res://gato"})
    }



}
