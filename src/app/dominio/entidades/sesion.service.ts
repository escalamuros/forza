import { Injectable } from '@angular/core';
import { Sesion } from '../interfaces/sesion/sesion'
@Injectable({
  providedIn: 'root'
})
export class SesionService {
    public sesion:Sesion

    constructor() {
        this.sesion={creada:false}
    }

    iniciarSesion(dataSesion){
        this.sesion.creada=true
        this.sesion.accessToken=dataSesion.accessToken
        this.sesion.refreshToken=dataSesion.refreshToken
        this.sesion.mcssToken=dataSesion.mcssToken
        this.sesion.tiempoVenceAccessToken =dataSesion.tiempoVenceAccessToken
    }

    getAccessToken(){
        return this.sesion.accessToken
    }

    getMcssToken(){
        return this.sesion.mcssToken
    }

}
