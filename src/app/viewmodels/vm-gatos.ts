
import {gato} from "../interfaces/gato/gatoResponse"
import {ApiGatosService} from "../services/api-gatos.service"
import {UcGatosService} from "../use_case/gatos/uc-gatos.service"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {map} from "rxjs/operators"

@Injectable({providedIn:'root'})
export class VmGatos {
    public productos$:Observable<gato>
    public gato:gato

    constructor(private _ucGatosService:UcGatosService,
        private productoService:ApiGatosService){
    }

    ngOnInit():void{
    }

    obtenerGatoLocal():Observable<gato>{
        console.log("[VmGatos]f obtenerGatoLocal")
        this.gato= ({"estado":"sin asignar",url:"res://gato"})
        this.productos$=new Observable(subscriber => {subscriber.next(this.gato)})
        return this.productos$
    }

    obtenerGatoRemoto():Observable<gato>{
        console.log("[VmGatos]f obtenerGatoRemoto")
        this.productos$ = this._ucGatosService.ObtenerGatoDesdeApi()
            .pipe(
                map(respuesta => {
                    if(respuesta.estado!== "ok"){
                        return({estado:"error",url:"res://gato"})
                    }else{
                        return respuesta
                    }
                })
            )
        return this.productos$
    }

}
