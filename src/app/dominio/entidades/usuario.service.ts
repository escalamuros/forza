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

    iniciarUsuario(){}

    procesoLogin(){}

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

}
