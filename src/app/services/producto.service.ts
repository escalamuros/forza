import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn:'root',})

export class ProductoService {

    constructor(private http:HttpClient){
    }

    obtenerGatoRemoto():Observable<any>{
        return this.http.get("https://api.thecatapi.com/v1/images/search")
    }

    obtenerPerroRemoto():void{
        let url="https://dog.ceo/api/breeds/image/random"
    }

    obtenerZorrrRemoto():void{

    }


}
