import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { SelectorLineaComponent } from './selector-linea/selector-linea.component';
import { NavegacionInferiorComponent } from './navegacion-inferior/navegacion-inferior.component';
import { CerrarSesionModalComponent } from './cerrar-sesion-modal/cerrar-sesion-modal.component';



@NgModule({
    declarations: [MenuModalComponent, SelectorLineaComponent, NavegacionInferiorComponent, CerrarSesionModalComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NavegacionInferiorComponent,
        SelectorLineaComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
