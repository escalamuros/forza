import "reflect-metadata"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"
import {ApiMantenedorService} from "../app/dominio/servicios/api-mantenedor.service"


describe("Api de mantenedor service:",()=> {
    let api: ApiMantenedorService
    let httpSpy
    beforeEach(()=>{
        console.log("[test]antes de cada IT")
        nsTestBedBeforeEach([], [ApiMantenedorService])
    });
    afterEach(()=>{
        console.log("[test]despues de cada IT")
        nsTestBedAfterEach(false)});
    it("fn obtenerEntidades, error en http", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error: true, tipo: "no"}))
        api.obtenerEntidades().subscribe(res => {
            console.log("respuesta serv :"+JSON.stringify(res))
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn obtenerEntidades, http ok, campo data.Entity no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({datos: {act:"token",token:"un_"}}))
        api.obtenerEntidades().subscribe(res => {
            console.log("respuesta serv :"+JSON.stringify(res))
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn obtenerEntidades, http respuesta ok", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({data: {Entity:{campo1:true,campo2:false}}}))
        api.obtenerEntidades().subscribe(res => {
            console.log("respuesta serv :"+JSON.stringify(res))
            expect(res).toEqual({campo1:true,campo2:false})
            done()
        })
    })
    it("fn obtenerFlagDeForzado, error en http",done=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:true, tipo:"no"}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res.error).toBeTruthy()
            done()
        })
    })
    it("fn obtenerFlagDeForzado, http respuesta true",done=>{
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({datos:true}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res).toBeTruthy()
            done()
        })
    })
    it("fn obtenerFlagDeForzado, http respuesta false",done=>{
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({datos:false}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res).toBeFalse()
            done()
        })
    })
    it("fn obtenerFlagDeForzado, http ok, flag no esta presente",done=>{
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:true, tipo:"no"}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res.error).toBeTruthy()
            done()
        })
    })

})


