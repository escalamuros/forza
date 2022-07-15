import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import {SplashComponent} from "./presentacion/inicio/splash/splash.component"
import {IngresoComponent} from "./presentacion/login/ingreso/ingreso.component"
import {ResumenPostpagoComponent} from "./presentacion/home/resumen-postpago/resumen-postpago.component"
import {ResumenFijoComponent} from "./presentacion/home/resumen-fijo/resumen-fijo.component"
import {ResumenPrepagoComponent} from "./presentacion/home/resumen-prepago/resumen-prepago.component"
import {ResumenHibridoComponent} from "./presentacion/home/resumen-hibrido/resumen-hibrido.component"
import {ResumenControlComponent} from "./presentacion/home/resumen-control/resumen-control.component"
import {PerfilComponent} from "./presentacion/home/perfil/perfil.component"

//{ path: "main", canActivate: [AuthGuard], loadChildren: () => import("../main/home/home.module").then(m => m.HomeModule) },
const routes: Routes = [
    { path: "", component:SplashComponent, pathMatch: "full" },
    { path:"ingreso", component:IngresoComponent },
    { path:"resumen-postpago", component:ResumenPostpagoComponent },
    { path:"resumen-fijo",component:ResumenFijoComponent},
    { path:"resumen-prepago", component:ResumenPrepagoComponent },
    { path:"resumen-hibrido",component:ResumenHibridoComponent},
    { path:"resumen-control",component:ResumenControlComponent},
    { path:"perfil" ,component:PerfilComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
