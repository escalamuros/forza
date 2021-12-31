import { Injectable } from '@angular/core';
import {Linea} from "../interfaces/linea/linea";
@Injectable({
  providedIn: 'root'
})
export class LineaService {
    private linea:Linea

    constructor() {
        //this.linea={logeado:false,tipoLogin:"na"};
    }

    iniciarLinea(dataUsuario){
        console.log("[lineaService] f iniciarLinea")

    }

    obtenerNumero(){
        return this.linea.numero
    }

    obtenerIdLinea(){
        return this.linea.id
    }

    obtenerCustomerIdLinea(){
        return this.linea.customerId
    }

    obtenerTipo(){
        return this.linea.tipo
    }


}
