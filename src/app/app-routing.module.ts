import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import {SplashComponent} from "./presentacion/inicio/splash/splash.component";
import {IngresoComponent} from "./presentacion/login/ingreso/ingreso.component";
import {ResumenComponent} from "./presentacion/home/resumen/resumen.component";

const routes: Routes = [
    { path: "", component:SplashComponent, pathMatch: "full" },
    { path:"ingreso", component:IngresoComponent },
    { path:"resumen", component:ResumenComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
