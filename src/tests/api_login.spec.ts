import "reflect-metadata"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"

import {ApiLoginService} from "../app/dominio/servicios/api-login.service"
import {loginPorCredenciales} from "../app/dominio/interfaces/login/loginRequest"

describe("Api de login service:",()=> {
    let credenciales: loginPorCredenciales = {rut: "a", clave: "b"}
    let actCode:string = "abc"
    let errorPrevio={error:"true",tipo:"nose"}
    let api: ApiLoginService
    let httpSpy
    beforeEach(()=>{
        console.log("[test]antes de cada IT")
        nsTestBedBeforeEach([], [ApiLoginService])
    });
    afterEach(()=>{
        console.log("[test]despues de cada IT")
        nsTestBedAfterEach(false)});
    it("fn loginconcredenciales, error en http", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error: true, tipo: "no"}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            expect(res.error).toBeTruthy()
        })
    })
    it("fn loginconcredenciales, http ok, campo act_token no esta presente", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({datos: {act:"token",token:"un_"}}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            expect(res.error).toBeTruthy()
        })
    })
    it("fn loginconcredenciales, http respuesta ok", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({datos: {act_token: "un_token"}}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            expect(res).toEqual("un_token")
        })
    })
    it("fn userAuthorize, viene un error en servicio anterior",()=>{
        api.userAuthorize(errorPrevio).subscribe(res=>{
            expect(res.error).toBeTruthy()
        })
    })
    it("fn userAuthorize, error en http",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:true, tipo:"no"}))
        api.userAuthorize(actCode).subscribe(res=>{
            expect(res.error).toBeTruthy()
        })
    })
    it("fn userAuthorize, http respuesta ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({otro:"si",datos: { code: "abc" } }))
        api.userAuthorize(actCode).subscribe(res=>{
            expect(res).toEqual("abc")
        })
    })
    it("fn userAuthorize, http ok, campo code no esta presente",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({otro:"si",datos: { codigo: "abc" } }))
        api.userAuthorize(actCode).subscribe(res=>{
            expect(res.error).toBeTruthy()
        })
    })
    it("fn tokenActivation, viene un error en servicio anterior",()=>{
        api.tokenActivation(errorPrevio).subscribe(res=>{
            expect(res.error).toBeTruthy()
        })
    })
    it("fn tokenActivation, error en http",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:true, tipo:"no"}))
        api.tokenActivation(actCode).subscribe(res=>{
            expect(res.error).toBeTruthy()
        })
    })
    it("fn tokenActivation, http respuesta ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({datos:{code:"abc"}}))
        api.tokenActivation(actCode).subscribe(res=>{
            expect(res).toEqual({datos:{code:"abc"}})
        })
    })
    it("fn tokenActivation, http ok, campo code no esta presente",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({datos:{algo:"abc"}}))
        api.tokenActivation(actCode).subscribe(res=>{
            expect(res).toEqual({datos:{algo:"abc"}})
        })
    })
})


