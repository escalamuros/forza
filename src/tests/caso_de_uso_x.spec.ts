// A complex Jasmine test
import "reflect-metadata"

import {UcGatosService} from "../app/use_case/gatos/uc-gatos.service"
import {ApiGatosService} from "../app/services/api-gatos.service"
import {gato} from "../app/interfaces/gato/gatoResponse"


import {TestBed} from "@angular/core/testing"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing';
import {of} from "rxjs";

describe("api gato service",()=>{
    let api:ApiGatosService
    let httpSpy
    beforeEach(nsTestBedBeforeEach([],[ApiGatosService]));
    afterEach(nsTestBedAfterEach(false));
    it("Crea el servicio con injeccion de dependencia",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        httpSpy.get.and.returnValue(of({estado:"error en API",url:""}))
        api.obtenerGatoRemoto().subscribe(res=>{
            expect(res.estado).toEqual("error en API")
        })
    })
})
describe("Caso de uso gato service",()=>{
    let uc:UcGatosService
    let api:ApiGatosService
    let httpSpy
    beforeEach(nsTestBedBeforeEach([],[ApiGatosService]));
    afterEach(nsTestBedAfterEach(false));
    it("Crea el servicio con un mock del httpclient que responde error",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of({estado:"error en API",url:""}))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    it("Crea el servicio con un mock del httpclient que responde ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of([{"breeds":[],"id":"cmd","url":"https://cdn2.thecatapi.com/images/cmd.jpg","width":1715,"height":1726}]))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(res.estado).toEqual("ok")
        })
    })
    it("Crea el servicio con un mock del httpclient que responde ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of([{"breeds":[],"id":"cmd","url":"https://cdn2.thecatapi.com/images/cmd.jpg","width":1715,"height":1726}]))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(uc.getContador()).toBe(1)
        })
    })
})
