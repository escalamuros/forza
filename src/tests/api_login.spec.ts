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
    it("fn loginconcredenciales, error en http", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error: true, tipo: "no"}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn loginconcredenciales, http ok, campo act_token no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:false,datos:{datos: {act:"token",token:"un_"}}}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn loginconcredenciales, http respuesta ok", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:false,datos:{datos: {act_token: "un_token"}}}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            console.log("[api-login.spec]resp:",res)
            expect(res.datos).toEqual("un_token")
            done()
        })
    })
    it("fn userAuthorize, viene un error en servicio anterior",done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:true,tipo:"no"}))
        api.userAuthorize(errorPrevio).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn userAuthorize, error en http",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:true, tipo:"no"}))
        api.userAuthorize(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn userAuthorize, http respuesta ok",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:false,datos:{datos: { code: "abc" } }}))
        api.userAuthorize(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res).toEqual("abc")
            done()
        })
    })
    it("fn userAuthorize, http ok, campo code no esta presente",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({otro:"si",datos: { codigo: "abc" } }))
        api.userAuthorize(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn tokenActivation, viene un error en servicio anterior",done => {
        api.tokenActivation(errorPrevio).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn tokenActivation, error en http",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:true, tipo:"no"}))
        api.tokenActivation(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn tokenActivation, http respuesta ok",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:false,datos:{access_token:"abc"}}))
        api.tokenActivation(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.datos).toEqual({access_token:"abc"})
            done()
        })
    })
    it("fn tokenActivation, http ok, campo access_token no esta presente",done => {
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({error:false,datos:{datos:{algo:"abc"}}}))
        api.tokenActivation(actCode).subscribe(res=>{
            console.log("[api-login.spec] res:",res)
            expect(res.error).toBeTruthy()
            done()
        })
    })
})


