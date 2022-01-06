import { Injectable } from '@angular/core';
import {Linea} from "../interfaces/linea/linea";
@Injectable({
  providedIn: 'root'
})
export class LineaService {
    private linea:Linea
    private updateContext:boolean

    constructor() {
        this.linea={id:"0",numero:"0",customerId:"0",tipo:"na",lineas:[]};
        this.updateContext=false
    }

    iniciarLinea(lineas){
        console.log("[lineaService] f iniciarLinea")
        if(lineas.length>0){
            this.linea.lineas=lineas
            this.linea.id=this.linea.lineas[0].id
            this.linea.numero=this.linea.lineas[0].id
            this.linea.customerId=this.linea.lineas[0].idclie
            this.linea.tipo=this.linea.lineas[0].tipo
            this.validarActualizarContexto()
            return true
        }
        return false
    }

    seleccionarLinea(indice){
        if(indice>this.linea.lineas.length){
            return false
        }
        if(indice<0){
            return false
        }
        let customerIdAnterior=this.linea.customerId
        this.linea.id=this.linea.lineas[indice].id
        this.linea.numero=this.linea.lineas[indice].numero
        this.linea.customerId=this.linea.lineas[indice].customerId
        this.linea.tipo=this.linea.lineas[indice].tipo
        if(this.linea.customerId!=customerIdAnterior) {
            this.validarActualizarContexto()
        }
        return true
    }

    validarActualizarContexto(){
        if(this.linea.tipo!="fijo"){
            this.updateContext=true
        }else{
            this.updateContext=false
        }
    }

    obtenerNumero(){
        return this.linea.numero
    }

    obtenerId(){
        return this.linea.id
    }

    obtenerCustomerId(){
        return this.linea.customerId
    }

    obtenerTipo(){
        return this.linea.tipo
    }


}
