import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { SplashComponent } from './splash/splash.component';



@NgModule({
  declarations: [SplashComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InicioModule {

    constructor() {
    }

}
