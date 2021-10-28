import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ResumenComponent } from './resumen/resumen.component';



@NgModule({
    declarations: [ResumenComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
