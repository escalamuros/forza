import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ModalDialogService} from "@nativescript/angular";

import { ResumenPostpagoComponent } from './resumen-postpago/resumen-postpago.component';
import { ResumenFijoComponent } from './resumen-fijo/resumen-fijo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResumenHibridoComponent } from './resumen-hibrido/resumen-hibrido.component';
import { ResumenPrepagoComponent } from './resumen-prepago/resumen-prepago.component';
import { ResumenControlComponent } from './resumen-control/resumen-control.component';

import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [ResumenPostpagoComponent,
        PerfilComponent,
        ResumenFijoComponent,
        ResumenHibridoComponent,
        ResumenPrepagoComponent,
        ResumenControlComponent],
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
