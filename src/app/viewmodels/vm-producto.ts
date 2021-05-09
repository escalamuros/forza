
import {gato} from "../models/productoModels/productoResponse";
import {ProductoService} from "../services/producto.service"
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn:'root'})
export class VmProducto {
    public productos$:Observable<gato>
    public gato:gato

    constructor(private productoService:ProductoService){
    }

    ngOnInit():void{
    }

    obtenerGatoLocal():Observable<gato>{
        this.gato={url:"res://gato"}
        this.productos$=new Observable(subscriber => {subscriber.next(this.gato)})
        return this.productos$
    }

    obtenerGatoRemoto():Observable<gato>{
        this.productos$ = this.productoService.obtenerGatoRemoto().pipe(map<any,gato>(res=>({url:res.url}) ))
        //return new Observable<gato>(subscriber=>{subscriber.next({url:"hola mundo"})})
        return this.productos$
    }


}
