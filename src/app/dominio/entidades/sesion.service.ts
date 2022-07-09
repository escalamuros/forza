import { Injectable } from '@angular/core'
import { Sesion } from '../interfaces/sesion/sesion'
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service"

@Injectable({
  providedIn: 'root'
})
export class SesionService {
    private sesion:Sesion

    constructor(private _persistencia:ProxyPersistenciaService) {
        this.sesion={creada:false}
    }

    iniciarSesion(dataSesion){
        this.sesion.creada=true
        this.sesion.accessToken=dataSesion.accessToken
        this.sesion.refreshToken=dataSesion.refreshToken
        this.sesion.mcssToken=dataSesion.mcssToken
        //expira viene en segundos, y date.gettime en milisegundos*1000
        let vence = Number(new Date().getTime()) + (Number(dataSesion.expira))
        this.sesion.tiempoVenceAccessToken =vence
        console.log("[sesion]guardando sesion:",this.sesion)
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
            console.log("[sesion] variable sesion rescatada:",this.sesion)
        }else{
            this.sesion={creada:false}
            console.log("[sesion] no hay sesion, variable incial sesion:",this.sesion)
            console.log("[sesion] sesion:",this.sesion)
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
        console.log("[sesion] ahora:",ahora)
        console.log("[sesion] vence:",this.sesion.tiempoVenceAccessToken)
        console.log("[sesion] resta:",ahora>=this.sesion.tiempoVenceAccessToken)
        if(typeof this.sesion.tiempoVenceAccessToken  === "undefined"){
            return true
        }
        if(ahora>=this.sesion.tiempoVenceAccessToken){
            return true
        }
        return false
    }

    renovarToken(resp){
        console.log("[sesion] f renovarToken")
        console.log("[sesion] datos:",resp)
        this.sesion.creada=true
        this.sesion.mcssToken=resp.mcssToken
        this.sesion.accessToken=resp.accessToken
        this.sesion.refreshToken=resp.refreshToken
        //expira viene en segundos, y date.gettime en milisegundos*1000
        let vence = Number(new Date().getTime()) + (Number(resp.expira))
        this.sesion.tiempoVenceAccessToken=vence
        this.guardarEnPersistencia()
    }
}
