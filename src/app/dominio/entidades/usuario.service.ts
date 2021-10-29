import { Injectable } from '@angular/core';
import {Usuario} from "../interfaces/usuario/usuario";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private usuario:Usuario

    constructor() {
        this.usuario={logeado:false,tipoLogin:"na"};
    }

    iniciarUsuario(arr){
        console.log("[usuarioService] f iniciaUsuario")
        this.usuario.tipoLogin=arr.tipoLogin
        this.usuario.tiempoVenceAccessToken = arr.tiempoVenceAccessToken
        this.usuario.accessToken = arr.accessToken
        this.usuario.refreshToken = arr.refreshToken
        this.usuario.mcssToken = arr.mcssToken
        this.usuario.linea = arr.linea
        this.usuario.customerIdLinea = arr.customerIdLinea
        this.usuario.tipoLinea = arr.tipoLinea
        console.log("[usuarioService] usuario:"+JSON.stringify(this.usuario))
    }

    estaLogeado(){
        return this.usuario.logeado;
    }

    tipoDeLogin(){
        return this.usuario.tipoLogin;
    }

    obtenerNombre(){
        return this.usuario.nombre;
    }

    guardarUsuarioPersistencia(){}

    borrarUsuarioPersistencia(){}

    getTipoLinea(){
        return this.usuario.tipoLinea
    }

    getCustomerIdLinea(){
        return this.usuario.customerIdLinea
    }

    getAccessToken(){
        return this.usuario.accessToken
    }

    getMcssToken(){
        return this.usuario.mcssToken
    }
}
