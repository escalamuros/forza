import "reflect-metadata"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"

import {UcIngresoService} from "../app/aplicacion/casos de uso/login/ingreso/uc-ingreso.service"
import {ApiLoginService} from "../app/dominio/servicios/api-login.service"
import {loginPorCredenciales} from "../app/dominio/interfaces/login/loginRequest"
import {UsuarioService} from "../app/dominio/entidades/usuario.service"
import {SesionService} from "../app/dominio/entidades/sesion.service"
import {LineaService} from "../app/dominio/entidades/linea.service"

xdescribe("Caso de uso ingreso service:",()=>{
    let credenciales:loginPorCredenciales={rut:"a",clave:"b"}
    let uc:UcIngresoService
    let api:ApiLoginService
    let usrSvc:UsuarioService
    let ssnSvc:SesionService
    let lnSvc:LineaService
    let apiLoginSpy,httpSpy
    beforeEach(nsTestBedBeforeEach([],[UcIngresoService,UsuarioService,SesionService]));
    afterEach(nsTestBedAfterEach(false));
    xit("mock IntegrarLoginConCredenciales ok",()=>{
        apiLoginSpy=jasmine.createSpyObj('ApiLoginService',['IntertarloginConCredenciales'])
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        apiLoginSpy.IntertarloginConCredenciales.and.returnValue(of({estado:"nook"}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    xit("mock IntegrarLoginConCredenciales error",()=>{
        apiLoginSpy=jasmine.createSpyObj('ApiLoginService',['IntertarloginConCredenciales'])
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        apiLoginSpy.IntertarloginConCredenciales.and.returnValue(of({estado:"nook"}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    xit("mock loginConCredenciales,userAuthorize,tokenActivation ok",()=>{
        apiLoginSpy=jasmine.createSpyObj('ApiLoginService',['loginConCredenciales','userAuthorize','tokenActivation'])
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        apiLoginSpy.loginConCredenciales.and.returnValue(of({datos:{act_token:"token"}}))
        apiLoginSpy.userAuthorize.and.returnValue(of({estado:"nook",tipo:"no"}))
        apiLoginSpy.tokenActivation.and.returnValue(of({estado:"ok"}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("nook")
        })
    })
})
