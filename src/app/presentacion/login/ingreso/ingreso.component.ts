import { Component, OnInit } from '@angular/core';
import { VmIngreso } from "../../../viewmodels/vm-ingreso";
import {loginPorCredenciales} from "../../../interfaces/login/loginRequest";
import {respuestaLogin} from "../../../interfaces/login/loginResponse";
import {RouterExtensions} from "@nativescript/angular";

@Component({
    selector: 'ns-ingreso',
    templateUrl: './ingreso.component.html',
    styleUrls: ['./ingreso.component.css']
})

export class IngresoComponent implements OnInit {

    credenciales:loginPorCredenciales
    respuestaLogin:respuestaLogin

    public clave: string=""
    public rut: string=""
    public respuesta: string

    constructor(private _enrrutador:RouterExtensions,
                private _ingresoViewModel:VmIngreso) {
        this.respuesta="Aun no ha intentado logear"
        this.clave="";
        this.rut="";
    }

    ngOnInit(): void {
    }

    async validarDatos() {
        console.log("[IngresoComponent]funcion validarDatos")
        this.credenciales={
            rut:this.rut,
            clave:this.clave}
        this.respuestaLogin = await this._ingresoViewModel.loginPorCredenciales(this.credenciales)
        this.reimprimir()
    }

    reimprimir() {
        if(this.respuestaLogin.estado!="ok"){
            this.respuesta="Intentalo de nuevo"
            this.clave="";
            this.rut="";
        } else {
            this.respuesta="Wena LARBBBBBBA"
            setTimeout(()=>{
                this.redirigePorSegmento()
            },2000)
        }
    }

    redirigePorSegmento():void{
        if(this.respuestaLogin.segmento === 'user'){this._enrrutador.navigate(["resumen"])}
        else if(this.respuestaLogin.segmento === 'admin'){this._enrrutador.navigate(["resumen_admin"])}
    }
}
