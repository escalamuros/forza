import { Injectable } from '@angular/core';
import {Usuario} from "../interfaces/usuario/usuario";
import {ProxyPersistenciaService} from "../../aplicacion/proxy/proxy.persistencia.service";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private usuario:Usuario

    constructor(private _persistencia:ProxyPersistenciaService) {
        this.usuario={logeado:false,tipoLogin:"na"};
    }

    iniciarUsuario(dataUsuario){
        console.log("[usuarioService] f iniciarUsuario")
        this.usuario.logeado=true
        this.usuario.tipoLogin=dataUsuario.tipoLogin
        this.usuario.nombre=dataUsuario.nombre
        this.usuario.apellidos=dataUsuario.apellidos
        this.usuario.correoElectronico=dataUsuario.correoElectronico
        this.usuario.sms=dataUsuario.sms
        this.usuario.rut=dataUsuario.rut
        this.usuario.productos=dataUsuario.productos
        this.guardarEnPersistencia()
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

    rescatarDePersistencia(){
        console.log("[usuarioService] f rescatarDePersistencia")
        if(this._persistencia.existe("usuario")){
            this.usuario = this._persistencia.obtener("usuario")
        }else{
            this.usuario={logeado:false,tipoLogin:"na"};
        }
    }

    guardarEnPersistencia(){
        this._persistencia.guardar("usuario",this.usuario)
    }

    borrarDePersistencia(){
        this._persistencia.limpiar("usuario")
    }




}
