
import {producto} from "../models/productoModels/productoResponse";
import {ProductoService} from "../services/producto.service"
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({providedIn:'root'})
export class VmProducto {
    public productos$:Observable<producto>
    public gato:producto

    constructor(private productoService:ProductoService){
    }

    ngOnInit():void{
    }

    obtenerProductos():Observable<producto>{
        /*this.productoService.obtenerProductos().subscribe(res=>{
            console.log(res)})*/
        this.gato={url:"res://gato",id:"1",width:"1",height:"2"}
        this.productos$=new Observable(subscriber => {subscriber.next(this.gato)})
        return this.productos$
    }

    obtenerHola():Observable<string>{
        return new Observable<string>(subscriber=>{subscriber.next("hola mundo")})
    }


}
