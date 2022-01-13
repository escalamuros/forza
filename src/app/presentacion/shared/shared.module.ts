import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { SelectorLineaComponent } from './selector-linea/selector-linea.component';
import { NavegacionInferiorComponent } from './navegacion-inferior/navegacion-inferior.component';



@NgModule({
    declarations: [MenuModalComponent, SelectorLineaComponent, NavegacionInferiorComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        NavegacionInferiorComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
