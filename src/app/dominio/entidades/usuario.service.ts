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

    iniciarUsuario(dataUsuario){
        console.log("[usuarioService] f iniciarUsuario")
        this.usuario.tipoLogin=dataUsuario.tipoLogin
        this.usuario.nombre=dataUsuario.nombre
        this.usuario.apellidos=dataUsuario.apellidos
        this.usuario.correoElectronico=dataUsuario.correoElectronico
        this.usuario.sms=dataUsuario.sms
        this.usuario.rut=dataUsuario.rut
        this.usuario.productos=dataUsuario.productos
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

    obtenerRut(){
        return this.usuario.rut
    }

    guardarUsuarioPersistencia(){}

    borrarUsuarioPersistencia(){}




}
