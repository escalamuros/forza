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
        //api = TestBed.inject(ApiGatosService)
        //uc= new UcGatosService(api)
        //expect(uc.getContador()).toBe(0)
    })
})
describe("Caso de uso gato service",()=>{
    let uc:UcGatosService
    let api:ApiGatosService
    let httpSpy
    beforeEach(nsTestBedBeforeEach([],[ApiGatosService]));
    afterEach(nsTestBedAfterEach(false));
    it("Crea el servicio con injeccion de dependencia",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of({estado:"error en API",url:""}))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
        //api = TestBed.inject(ApiGatosService)
        //uc= new UcGatosService(api)
        //expect(uc.getContador()).toBe(0)
    })
})

    /*it("Simula respuesta no ok en servicio",()=>{
        let respuesta:gato
        api = TestBed.inject(ApiGatosService)
        uc= new UcGatosService(api)
        spyOn(api, 'obtenerGatoRemoto').and.returnValue(
            of({estado:"error en API",url:""})
        )
        uc.ObtenerGatoDesdeApi().subscribe((resp)=>{
                respuesta=resp
                expect(respuesta.estado).not.toEqual("ok")
                //expect(respuesta.url).toEqual("")
                //expect(uc.getContador()).toBe(1)
            }
        )
    })
    it("Simula respuesta ok en servicio",()=>{
        let respuesta:gato
        api = TestBed.inject(ApiGatosService)
        uc= new UcGatosService(api)
        spyOn(api, 'obtenerGatoRemoto').and.returnValue(
            of([{"breeds":[],"id":"ce5","url":"https://cdn2.thecatapi.com/images/ce5.jpg","width":500,"height":334}])
        )
        uc.ObtenerGatoDesdeApi().subscribe((resp)=>{
                respuesta=resp
                expect(respuesta.estado).toEqual("ok")
                //expect(respuesta.url).toEqual("")
                //expect(uc.getContador()).toBe(1)
            }
        )
    })*/

