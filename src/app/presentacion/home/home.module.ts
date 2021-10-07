import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ResumenComponent } from './resumen/resumen.component';
import { GatoComponent } from './gatos/gato.component';



@NgModule({
    declarations: [ResumenComponent, GatoComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        GatoComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
