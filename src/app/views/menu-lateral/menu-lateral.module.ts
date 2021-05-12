import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { MenuGeneralComponent } from './menu-general/menu-general.component';
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";



@NgModule({
    declarations: [MenuGeneralComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule
    ],
    exports: [
        MenuGeneralComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MenuLateralModule { }
