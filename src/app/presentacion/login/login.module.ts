import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { IngresoComponent } from './ingreso/ingreso.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [IngresoComponent],
    imports: [
        NativeScriptCommonModule,
        FormsModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
