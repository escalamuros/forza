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
    let respuestaFinal={
        rut:"123",
        dv:"4",
        tiempoVenceAccessToken :"nose",
        access_token:"algo",
        refresh_token:"algo",
        mcsstoken:"algo",
        responseBknd:{
            token:{
                cliente:{
                    nombre:"aaa",
                    apellido_paterno:"Aaaa",
                    appellido_materno:"Bbbb",
                    contacto:{
                        mail:"a@b.c",
                        sms:"sms"
                    },
                    productos:{producto:[{idclie:"a",id:"b",tipo:"MOVIL"}]}}}}
    }
    let uc:UcIngresoService
    let api:ApiLoginService
    let usrSvc:UsuarioService
    let ssnSvc:SesionService
    let lnSvc:LineaService
    let apiLoginSpy,httpSpy
    beforeEach(nsTestBedBeforeEach([],[ApiLoginService]));
    afterEach(nsTestBedAfterEach(false));
    it("mock en fn IntegrarLoginConCredenciales da error",()=>{
        apiLoginSpy=jasmine.createSpyObj('ApiLoginService',['IntertarloginConCredenciales'])
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        apiLoginSpy.IntertarloginConCredenciales.and.returnValue(of({error:true,tipo:"no ok"}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    it("mock en fn IntegrarLoginConCredenciales ok",()=>{
        apiLoginSpy=jasmine.createSpyObj('ApiLoginService',['IntertarloginConCredenciales','updateClientUserContext'])
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        apiLoginSpy.IntertarloginConCredenciales.and.returnValue(of(respuestaFinal))
        apiLoginSpy.updateClientUserContext.and.returnValue(of({estado:"ok",segmento:"MOVIL"}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
})
