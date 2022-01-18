import { Injectable } from '@angular/core';
import {Linea} from "../interfaces/linea/linea";
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service";
@Injectable({
  providedIn: 'root'
})
export class LineaService {
    private linea:Linea
    private debeActualizarContexto:boolean

    constructor(private _persistencia:ProxyPersistenciaService) {
        this.linea={id:"0",numero:"0",customerId:"0",tipo:"na",lineas:[]};
        this.debeActualizarContexto=false
    }

    iniciarLinea(lineas){
        if(lineas.length>0){
            this.linea.id=lineas[0].id
            this.linea.numero=lineas[0].id
            this.linea.customerId=lineas[0].idclie
            this.linea.tipo=lineas[0].tipo
            this.linea.tipoContratoOri=lineas[0].tipoContratoOri
            this.linea.lineas=lineas
            this.validarActualizarContexto()
            this.guardarEnPersistencia()
            return true
        }
        this.linea={id:"0",numero:"0",customerId:"0",tipo:"na",lineas:[]};
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
        this.linea.tipoContratoOri=this.linea.lineas[indice].tipoContratoOri
        if(this.linea.customerId!=customerIdAnterior) {
            this.validarActualizarContexto()
        }
        return true
    }

    validarActualizarContexto(){
        if(this.linea.tipo!="fijo"){
            this.debeActualizarContexto=true
        }else{
            this.debeActualizarContexto=false
        }
    }

    obtenerActualizarContexto(){
        return this.debeActualizarContexto
    }

    actualizarContextoRealizado(){
        this.debeActualizarContexto=false
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

    rescatarDePersistencia(){
        if(this._persistencia.existe("linea")){
            this.linea = this._persistencia.obtener("linea")
        }else{
            this.linea={id:"0",numero:"0",customerId:"0",tipo:"na",lineas:[]}
        }
    }

    guardarEnPersistencia(){
        this._persistencia.guardar("linea",this.linea)
    }

    borrarDePersistencia(){
        this._persistencia.limpiar("linea")
    }

    limpiarVariableLinea(){
        this.linea={id:"0",numero:"0",customerId:"0",tipo:"na",lineas:[]}
    }
}
