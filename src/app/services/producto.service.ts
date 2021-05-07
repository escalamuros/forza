import {Injectable} from "@angular/core";

import {producto} from "../models/productoModels/productoResponse";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn:'root',})

export class ProductoService {
    private productos:producto[]

    constructor(private http:HttpClient){
    }

    obtenerProductos():Observable<any>{
        console.log("[productoService] funcion obtenerProductos")
        return this.http.get("https://api.thecatapi.com/v1/images/search")
    }

}
