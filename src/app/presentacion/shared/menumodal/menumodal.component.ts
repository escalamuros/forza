import { Component, OnInit } from "@angular/core"
import {ModalDialogParams} from "@nativescript/angular";

@Component({
  selector: 'ns-menumodal',
  templateUrl: './menumodal.component.html',
  styleUrls: ['./menumodal.component.css']
})
export class MenumodalComponent implements OnInit {

  constructor(private _parametros:ModalDialogParams) { }

  ngOnInit(): void {
  }

  cerrarModal(respuesta){
      console.log("[MenumodalComponent] f cerrarModal")
      this._parametros.closeCallback(respuesta)
  }

}
