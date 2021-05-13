
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
        console.log("[vmProducto]f obtenerGatoLocal")
        this.gato= ({url:"res://gato"})
        this.productos$=new Observable(subscriber => {subscriber.next(this.gato)})
        return this.productos$
    }

    obtenerGatoRemoto():Observable<gato>{
        console.log("[vmProducto]f obtenerGatoRemoto")
        this.productos$ = this.productoService.obtenerGatoRemoto()
            .pipe(
                map(res => {
                    console.log("[vmProducto] productoService res:",res)
                    let gatoTemporal:string=''
                    for(let item of res){
                        if(item.url!== null){
                            gatoTemporal=item.url
                        }
                    }
                    if(gatoTemporal==''){
                        gatoTemporal="res://gato"
                    }
                    return ({"url":gatoTemporal})
                })
            )
        return this.productos$
    }


    obtenerHolaMundo() {
        return new Observable<string>(subscriber=>{subscriber.next("El primer gato esta en la APP")})
    }
}
