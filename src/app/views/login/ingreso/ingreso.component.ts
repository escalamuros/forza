import { Component, OnInit } from '@angular/core';
import { VmIngreso } from "../../../viewmodels/vm-ingreso";
import {loginPorCredenciales} from "../../../models/loginModels/loginRequest";
import {respuestaLogin} from "../../../models/loginModels/loginResponse";
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
    public _respuesta: string=""

    constructor(private enrrutador:RouterExtensions,
                private IngresoViewModel:VmIngreso) {
    }

    ngOnInit(): void {
        this._respuesta="Aun no ha logeado"
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
        } else {
            this._respuesta="Wena LARBBBBBBA"
            setTimeout(()=>{
                this.enrrutador.navigate(["resumen"])},2000)
        }

    }
}
