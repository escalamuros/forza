import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ModalDialogService} from "@nativescript/angular";

import { ResumenComponent } from './resumen/resumen.component';
import { MenumodalComponent} from "../shared/menumodal/menumodal.component";


@NgModule({
    declarations: [ResumenComponent,MenumodalComponent],
    providers:[ModalDialogService],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
