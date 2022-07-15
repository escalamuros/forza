import { Component, OnInit } from '@angular/core';

//caso de uso
import { UcIngresoService } from "../../../aplicacion/casos de uso/login/ingreso/uc-ingreso.service";

//modelos
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
    public accionBloqueada:boolean
    public tiempoInicio:Date
    public tiempoFin:Date

    constructor(private _enrrutador:RouterExtensions,
                private _cuIngreso:UcIngresoService) {
        this.respuesta="Aun no ha intentado logear"
        this.rut="17534493-4"
        this.clave="cobra123"
        this.accionBloqueada=false
        this.respuestaLogin={estado:"na"}
    }

    ngOnInit(): void {
        console.log("[IngresoComponent] funcion ngOnInit")
        this.accionBloqueada=false
    }

    validarCredenciales() {
        console.log("[IngresoComponent] funcion validarCredenciales")
        if(this.accionBloqueada){
            console.log("[IngresoComponent] accion en curso, funcion no realiza nada")
        }
        if(!this.accionBloqueada){
            this.accionBloqueada=true
            this.respuesta="logeando ..."
            this.tiempoInicio=new Date()
            this.credenciales={
                rut:this.rut,
                clave:this.clave}
            this._cuIngreso.loginPorCredenciales(this.credenciales).subscribe(resp=>{
                console.log("[IngresoComponent]respuesta:" + JSON.stringify(resp))
                this.tiempoFin=new Date()
                this.respuestaLogin=resp
                this.mensajeDespuesDeIntento()
                this.accionDespuesDeIntento()
            })
        }
    }

    mensajeDespuesDeIntento() {
        console.log("[IngresoComponent]funcion mensajeDespuesDeIntento")
        if(this.respuestaLogin.estado!="ok"){
            this.respuesta="Algo falló:"+this.respuestaLogin.error
        } else {
            let dif= this.tiempoFin.getTime() - this.tiempoInicio.getTime()
            this.respuesta="Login OK en "+dif+" milisegundos"
        }
    }

    accionDespuesDeIntento():void{
        console.log("[IngresoComponent]funcion accionDespuesDeIntento")
        this.accionBloqueada=false
        if(this.respuestaLogin.estado!="ok"){
            this.clave=""
            this.rut=""
            this.respuestaLogin={estado:"na"}
        } else {
            console.log("[IngresoComponent]debe de enviar a :",this.respuestaLogin.segmento)
            //para logeo automatico dejar siguient linea si comentar
            //this._enrrutador.navigate([this.respuestaLogin.segmento])
        }
    }
    saltarAResumen():void{
        if(this.accionBloqueada){
            console.log("[IngresoComponent] accion en curso, funcion no realiza nada")
        }else{
            if( this.respuestaLogin.estado=="ok"){
                this._enrrutador.navigate([this.respuestaLogin.segmento])
            }else{
                console.log("[IngresoComponent] no estas identificado, funcion no realiza nada")
            }
        }
    }

    validarLinea(){
        if(this.accionBloqueada){
            console.log("[IngresoComponent] accion en curso, funcion no realiza nada")
        }
        if(!this.accionBloqueada) {
            this._enrrutador.navigate(["resumen-postpago"]);
        }
    }
}
