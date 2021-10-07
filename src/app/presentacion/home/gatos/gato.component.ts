import { Component, OnInit } from '@angular/core';

import {VmGatos} from "../../../viewmodels/vm-gatos";
import {Observable} from "rxjs";
import {gato} from "../../../interfaces/gato/gatoResponse";

@Component({
  selector: 'ns-gato',
  templateUrl: './gato.component.html',
  styleUrls: ['./gato.component.css']
})
export class GatoComponent implements OnInit {
    gatoRemoto$:Observable<gato>
    gatoLocal:gato
    temp:string

    constructor(private vmGatos:VmGatos) { }

    ngOnInit(): void {
        console.log("[GatoComponent]gnInit")
        this.obtenerGatoLocal()
        this.temp = "primer Gato esta en la APP"
    }

    obtenerGatoLocal(): void {
        console.log("[GatoComponent]f obtenerGatoLocal")
        this.vmGatos.obtenerGatoLocal().subscribe(res=>{
            this.gatoLocal=res
        })
    }

    obtenerGatoRemoto(): void {
        console.log("[GatoComponent]f obtenerGatoRemoto")
        this.temp="cargando"
        this.vmGatos.obtenerGatoRemoto().subscribe(res=>{
            console.log("[GatoComponent] res:",res)
            this.gatoLocal=res
            this.temp=""
        })
    }

}
