import { Component, OnInit } from '@angular/core';
import { UcIngresoService } from "../../../aplicacion/casos de uso/login/ingreso/uc-ingreso.service";
import {loginPorCredenciales} from "../../../dominio/interfaces/login/loginRequest";
import {respuestaLogin} from "../../../dominio/interfaces/login/loginResponse";
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
    public bloquearAcciones:boolean
    public tiempoInicio:Date
    public tiempoFin:Date

    constructor(private _enrrutador:RouterExtensions,
                private _cuIngreso:UcIngresoService) {
        this.respuesta="Aun no ha intentado logear"
        this.rut="17534493-4";
        this.clave="cobra123";
        console.log("[IngresoComponent] Esto es un commit de miguelangel nuevo");
    }

    ngOnInit(): void {
        console.log("[IngresoComponent] funcion ngOnInit")
        this.bloquearAcciones=false
    }

    validarDatos() {
        console.log("[IngresoComponent] funcion validarDatos")
        if(this.bloquearAcciones){
            console.log("[IngresoComponent] acciones bloqueadas")
        }else{
            this.bloquearAcciones=true
            this.respuesta="logeando ..."
            this.tiempoInicio=new Date()
            this.credenciales={
                rut:this.rut,
                clave:this.clave}
            this._cuIngreso.loginPorCredenciales(this.credenciales).subscribe(resp=>{
                console.log("[IngresoComponent]respuesta:" + JSON.stringify(resp))
                this.tiempoFin=new Date()
                this.respuestaLogin=resp
                this.reimprimir()
            })
        }

    }

    reimprimir() {
        console.log("[IngresoComponent]funcion reimprimir")
        if(this.respuestaLogin.estado!="ok"){
            this.respuesta="Algo falló:"+this.respuestaLogin.error
            this.clave="";
            this.rut="";
            this.bloquearAcciones=false
        } else {
            let dif= this.tiempoFin.getTime() - this.tiempoInicio.getTime()
            this.respuesta="Login OK en "+dif+" milisegundos"
            this.bloquearAcciones=false
            setTimeout(()=>{
                this.redirigePorSegmento()
            },5000)
        }
    }

    redirigePorSegmento():void{
        if(this.respuestaLogin.segmento === 'user'){this._enrrutador.navigate(["resumen"])}
        else if(this.respuestaLogin.segmento === 'admin'){this._enrrutador.navigate(["resumen-admin"])}
    }
}
