import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ResumenComponent } from './resumen/resumen.component';
import { ProductoComponent } from './producto/producto.component';



@NgModule({
    declarations: [ResumenComponent, ProductoComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        ProductoComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
