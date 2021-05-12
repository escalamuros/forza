import { Component, OnInit } from '@angular/core';

import {VmProducto} from "../../../viewmodels/vm-producto";
import {Observable} from "rxjs";
import {gato} from "../../../models/productoModels/productoResponse";

@Component({
  selector: 'ns-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
    gatoRemoto$:Observable<gato>
    gatoLocal:gato
    temp$:Observable<string>

    constructor(private vmProducto:VmProducto) { }

    ngOnInit(): void {
        console.log("[productoComponent]gnInit")
        this.obtenerGatoLocal()
        this.obtenerHolaMundo()
    }
    obtenerHolaMundo():void{
        this.temp$ = this.vmProducto.obtenerHolaMundo()
    }

    obtenerGatoLocal(): void {
        console.log("[productoComp]f obtenerGatoLocal")
        this.vmProducto.obtenerGatoLocal().subscribe(res=>{
            this.gatoLocal=res
        })
    }

    obtenerGatoRemoto(): void {
        console.log("[productoComp]f obtenerGatoRemoto")
        this.vmProducto.obtenerGatoRemoto().subscribe(res=>{
            console.log("[productoComp] res:",res)
            this.gatoLocal=res
        })
    }

}
