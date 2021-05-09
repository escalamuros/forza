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
    gatito:gato

    constructor(private vmProducto:VmProducto) { }

    ngOnInit(): void {
        this.gatito = { url: "" }
        this.obtenerGatoLocal()
    }

    obtenerGatoLocal(){
        this.vmProducto.obtenerGatoLocal().subscribe(res=>{
            this.gatito=res
        })
    }

    obtenerGatoRemoto(){
        this.gatoRemoto$ = this.vmProducto.obtenerGatoRemoto()
    }

}
