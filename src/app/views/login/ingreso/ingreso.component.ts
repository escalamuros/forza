import { Component, OnInit } from '@angular/core';
import { VmIngreso } from "../../../viewmodels/vm-ingreso";
import {loginPorCredenciales} from "../../../interfaces/loginModels/loginRequest";
import {respuestaLogin} from "../../../interfaces/loginModels/loginResponse";
import {RouterExtensions} from "@nativescript/angular";

@Component({
    selector: 'ns-ingreso',
    templateUrl: './ingreso.component.html',
    styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit {

    _intentoLogin:loginPorCredenciales
    _respuestaLogin:respuestaLogin

    public _clave: string=""
    public _rut: string=""
    public _respuesta: string

    constructor(private enrrutador:RouterExtensions,
                private IngresoViewModel:VmIngreso) {
        this._respuesta="Aun no ha intentado logear"
        this._clave="";
        this._rut="";
    }

    ngOnInit(): void {
    }

    async validarDatos() {
        console.log("[IngresoComponent]funcion validarDatos")
        this._intentoLogin={
            rut:this._rut,
            clave:this._clave}
        console.dir(this._intentoLogin)
        this._respuestaLogin = await this.IngresoViewModel.loginPorCredenciales(this._intentoLogin)
        console.log("[IngresoController]respuesta:")
        console.dir(this._respuestaLogin)
        this._respuesta = this._respuestaLogin.estado
        this.reimprimir()
    }

    reimprimir() {
        if(this._respuestaLogin.estado!="ok"){
            this._respuesta="Intentalo de nuevo"
            this._clave="";
            this._rut="";
        } else {
            this._respuesta="Wena LARBBBBBBA"
            setTimeout(()=>{
                this.enrrutador.navigate(["resumen"])},2000)
        }

    }
}
