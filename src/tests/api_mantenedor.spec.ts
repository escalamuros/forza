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
        httpSpy.get.and.returnValue(of({error: true, tipo: "no hay entidades"}))
        api.obtenerEntidades().subscribe(res => {
            console.log("[api-mantenedor.spec]respuesta serv :"+JSON.stringify(res))
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("no hay entidades")
            done()
        })
    })
    it("fn obtenerEntidades, http ok, campo data no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos: {act:"token",token:"un_"}}))
        api.obtenerEntidades().subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("respuesta erronea,no hay data")
            done()
        })
    })
    it("fn obtenerEntidades, http ok, campo data.Entity no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos:{data:{act:"token",token:"un_"}}}))
        api.obtenerEntidades().subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("respuesta erronea,no hay entidades")
            done()
        })
    })
    it("fn obtenerEntidades, http respuesta ok", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos:{data: {Entity:{campo1:true,campo2:false}}}}))
        api.obtenerEntidades().subscribe(res => {
            expect(res.error).toBeFalsy()
            done()
        })
    })

    it("fn obtenerEntidad, error en peticion de Entidad", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error: true, tipo: "este mensaje no importa"}))
        // la entidad "alguna" no esta en el arreglo de entidades
        api.obtenerEntidad("alguna").subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("Entidad no esta en las constantes")
            done()
        })
    })
    it("fn obtenerEntidad, error en http", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error: true, tipo: "no hay entidad"}))
        api.obtenerEntidad("modales_wv").subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("no hay entidad")
            done()
        })
    })
    it("fn obtenerEntidad, http ok, campo data no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos: {act:"token",token:"un_"}}))
        api.obtenerEntidad("modales_wv").subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("respuesta erronea,no hay data")
            done()
        })
    })
    it("fn obtenerEntidad, http ok, campo data.Entity no esta presente", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos:{data:{act:"token",token:"un_"}}}))
        api.obtenerEntidad("modales_wv").subscribe(res => {
            expect(res.error).toBeTruthy()
            expect(res.tipo).toEqual("respuesta erronea,no hay entidades")
            done()
        })
    })
    it("fn obtenerEntidad, http respuesta ok", done => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:false,datos:{data: {Entity:{campo1:true,campo2:false}}}}))
        api.obtenerEntidad("modales_wv").subscribe(res => {
            console.log("respuesta serv :"+JSON.stringify(res))
            expect(res.error).toBeFalsy()
            done()
        })
    })

    it("fn obtenerFlagDeForzado, error en http",done=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiMantenedorService(httpSpy)
        httpSpy.get.and.returnValue(of({error:true, tipo:"no"}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res).toBeFalsy()
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
        httpSpy.get.and.returnValue(of({error:true, datos: {campo1:"texto"}}))
        api.obtenerFlagDeForzado().subscribe(res=>{
            expect(res).toBeFalsy()
            done()
        })
    })

})


