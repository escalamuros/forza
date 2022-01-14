import { Injectable } from '@angular/core';
import { getString,setString,hasKey,remove,clear } from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class ProxyPersistenciaService {

    constructor() { }

    public obtener(llave:string):any {
        const valor:string= getString(llave);
        return JSON.parse(valor)
    }

    public guardar(llave:string,valor:any):void{
        const valorString=JSON.stringify(valor);
        setString(llave,valorString);
    }

    public existe(llave:string):boolean{
        return hasKey(llave)
    }

    public limpiar(llave:string){
        remove(llave)
    }
    public limpiarTodo(){
        clear();
    }

}
