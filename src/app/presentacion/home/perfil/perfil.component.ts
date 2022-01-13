import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "@nativescript/angular";
import {MenuModalComponent} from "../../shared/menu-modal/menu-modal.component";

@Component({
  selector: 'ns-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public rutas:string

  constructor(
      private _modalService: ModalDialogService,
      private _vcRef: ViewContainerRef,
      private _enrrutador:RouterExtensions,
      ) {
      console.log("[PerfilComponent] constructor")
      this.rutas=""
  }

  ngOnInit(): void {
      console.log("[PerfilComponent] f ngOnInit")
      this.rutas=this._enrrutador.frameService.getFrame().toString()

  }

    abrirMenuModal(){
        const opciones: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: true
        };

        this._modalService.showModal(MenuModalComponent, opciones)
            .then((resultado: string) => {
                console.log("[ResumenComponent] accion menu modal: "+resultado);

                //posible timeout por el movimiento-desaparicion del modal
                setTimeout(()=>{this.redirigir(resultado)},50)

            });
    }

    redirigir(resultado){
        if(resultado===""){
            console.log("[ResumenComponent] cierro modal")
        }
        else{
            this._enrrutador.navigate([resultado])
        }
    }

}
