
import {gato} from "../interfaces/productoModels/productoResponse";
import {ApiGatosService} from "../services/api-gatos.service"
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn:'root'})
export class VmGatos {
    public productos$:Observable<gato>
    public gato:gato

    constructor(private productoService:ApiGatosService){
    }

    ngOnInit():void{
    }

    obtenerGatoLocal():Observable<gato>{
        console.log("[VmGatos]f obtenerGatoLocal")
        this.gato= ({url:"res://gato"})
        this.productos$=new Observable(subscriber => {subscriber.next(this.gato)})
        return this.productos$
    }

    obtenerGatoRemoto():Observable<gato>{
        console.log("[VmGatos]f obtenerGatoRemoto")
        this.productos$ = this.productoService.obtenerGatoRemoto()
            .pipe(
                map(res => {
                    console.log("[VmGatos] api de gatos res:",res)
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
