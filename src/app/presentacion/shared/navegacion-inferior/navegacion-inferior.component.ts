import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {MenuModalComponent} from "../menu-modal/menu-modal.component"
import {CerrarSesionModalComponent} from "../cerrar-sesion-modal/cerrar-sesion-modal.component"
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "@nativescript/angular";

import {LineaService} from "../../../dominio/entidades/linea.service";

@Component({
    selector: 'ns-navegacion-inferior',
    templateUrl: './navegacion-inferior.component.html',
    styleUrls: ['./navegacion-inferior.component.css']
})
export class NavegacionInferiorComponent implements OnInit {
    private tipo
    private tipoContrtoOri
    private listaDeAcciones=[]

    constructor(
        private _linea:LineaService,
        private _modalService: ModalDialogService,
        private _enrrutador: RouterExtensions,
        private _vcRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        console.log("[NavegacionInferiorComponent] f ngOnInit")
        this.tipo=this._linea.obtenerTipo()
        this.tipoContrtoOri=this._linea.obtenerTipoContratoOri()
        console.log("[NavegacionInferiorComponent]ruta actual:"+this._enrrutador.router.url)
        this.listaDeAcciones = [
            {texto:"Resumen",accion:"resumen",visible:true},
            {texto:"perfil",accion:"perfil",visible:true},
            {texto:"usage",accion:"usage",visible:true},
            {texto:"no",accion:"usage",visible:true}
        ]
    }

    abrirModalDeMenu() {
        const opciones: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: true
        };

        this._modalService.showModal(MenuModalComponent, opciones)
            .then((resultado: string) => {
                console.log("[NavegacionInferiorComponent] accion menu modal: " + resultado);

                //posible timeout por el movimiento-desaparicion del modal
                setTimeout(() => {
                    this.redirigir(resultado)
                }, 50)

            });
    }

    redirigir(resultado) {
        if (resultado === "") {
            console.log("[NavegacionInferiorComponent] cierro modal")
        } else {
            if (resultado === "cerrar_sesion") {
                this.abrirModalDeCerrarSesion()
            } else {
                this._enrrutador.navigate([resultado])
            }
        }
    }

    abrirModalDeCerrarSesion() {
        const opciones: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: true
        };

        this._modalService.showModal(CerrarSesionModalComponent, opciones)
            .then((resultado: string) => {
                console.log("[NavegacionInferiorComponent] accion cerrar sesion modal: " + resultado);

                //posible timeout por el movimiento-desaparicion del modal
                setTimeout(() => {
                    this.salirONada(resultado)
                }, 50)

            });
    }

    salirONada(res) {
        if (res === "ok") {
            console.log("[NavegacionInferiorComponent] solo redireccion a ingreso ");
            //todo: limpiar linea(en contexto),usuario y sesion

            this._enrrutador.navigate(["ingreso"])
        }
    }

    accionNavegador(indice){

    }


}
