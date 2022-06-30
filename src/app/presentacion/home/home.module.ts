import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ModalDialogService} from "@nativescript/angular";

import { ResumenComponent } from './resumen/resumen.component';
import { ResumenFijoComponent } from './resumen-fijo/resumen-fijo.component';
import { PerfilComponent } from './perfil/perfil.component';
//import { MenuModalComponent} from "../shared/menu-modal/menu-modal.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [ResumenComponent, PerfilComponent, ResumenFijoComponent],
    providers:[ModalDialogService],
    imports: [
        NativeScriptCommonModule,
        SharedModule
    ],
    exports: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {

}
