import { Component, OnInit } from '@angular/core';

import {VmProducto} from "../../../viewmodels/vm-producto";
import {Observable} from "rxjs";
import {producto} from "../../../models/productoModels/productoResponse";

@Component({
  selector: 'ns-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
    public variable:string
    saludo$:Observable<string>
    gatito:producto

    constructor(private vmProducto:VmProducto) { }

  ngOnInit(): void {
      this.obtenerHola()
      this.gatito = {
          id: "",
          url: "",
          width: "",
          height: ""
      }
  }

  obtenerHola(){
      this.saludo$ = this.vmProducto.obtenerHola()
  }

  obtenerGatito(){
        this.vmProducto.obtenerProductos().subscribe(res=>{
            this.gatito=res
        })
  }

}
