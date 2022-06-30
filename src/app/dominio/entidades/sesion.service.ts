import { Injectable } from '@angular/core'
import { Sesion } from '../interfaces/sesion/sesion'
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service"

@Injectable({
  providedIn: 'root'
})
export class SesionService {
    public sesion:Sesion

    constructor(private _persistencia:ProxyPersistenciaService) {
        this.sesion={creada:false}
    }

    iniciarSesion(dataSesion){
        this.sesion.creada=true
        this.sesion.accessToken=dataSesion.accessToken
        this.sesion.refreshToken=dataSesion.refreshToken
        this.sesion.mcssToken=dataSesion.mcssToken
        this.sesion.tiempoVenceAccessToken =dataSesion.tiempoVenceAccessToken
        this.guardarEnPersistencia()
    }

    estaCreada(){
        return this.sesion.creada;
    }

    getAccessToken(){
        return this.sesion.accessToken
    }

    getMcssToken(){
        return this.sesion.mcssToken
    }

    getRefreshToken(){
        return this.sesion.refreshToken
    }

    rescatarDePersistencia(){
        if(this._persistencia.existe("sesion")){
            this.sesion = this._persistencia.obtener("sesion")
        }else{
            this.sesion={creada:false};
        }
    }

    guardarEnPersistencia(){
        this._persistencia.guardar("sesion",this.sesion)
    }

    borrarDePersistencia(){
        this._persistencia.limpiar("sesion")
    }

    limpiarVariableSesion(){
        this.sesion={creada:false};
    }

    estaVencida(){
        let ahora=new Date().getTime()
        if(ahora>=this.sesion.tiempoVenceAccessToken){
            return true
        }
        return false
    }

    renovarToken(resp){
        /*this.sesion.mcssToken
        this.sesion.accessToken
        this.sesion.refreshToken
        this.sesion.tiempoVenceAccessToken
        this.guardarEnPersistencia()*/
    }
}
