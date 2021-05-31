// A complex Jasmine test
import "reflect-metadata"

import {UcIngresoService} from "../app/use_case/ingreso/uc-ingreso.service"
import {ApiLoginService} from "../app/services/api-login.service"
import {loginPorCredenciales} from "../app/interfaces/login/loginRequest"
import {respuestaLogin} from "../app/interfaces/login/loginResponse"

import {TestBed} from "@angular/core/testing"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing';

describe("a",()=>{
    let uc:UcIngresoService
    let api:ApiLoginService
    beforeEach(nsTestBedBeforeEach([],[ApiLoginService]));
    afterEach(nsTestBedAfterEach(false));
    it("b",()=>{
        api = TestBed.inject(ApiLoginService)
        uc= new UcIngresoService(api)
        expect(uc.contador).toBe(0)

    })
    it("c",()=>{
        let entrada:loginPorCredenciales={rut:"1",clave:"2"}
        let respuesta:respuestaLogin
        api = TestBed.inject(ApiLoginService)
        uc= new UcIngresoService(api)
        spyOn(api, 'loginCredenciales').and.returnValue(
            new Promise(async (resolve,reject)=>{resolve({estado:"ok"})})
        )
        uc.loginPorCredenciales(entrada).then((resp)=>{
                respuesta=resp
                expect(respuesta).toEqual({estado:"ok"})
            }
        )
    })
    it("d",()=>{
        let entrada:loginPorCredenciales={rut:"1",clave:"2"}
        let respuesta:respuestaLogin
        api = TestBed.inject(ApiLoginService)
        uc= new UcIngresoService(api)
        spyOn(api, 'loginCredenciales').and.returnValue(
            new Promise(async (resolve,reject)=>{resolve({estado:"nook"})})
        )
        uc.loginPorCredenciales(entrada).then((resp)=>{
            respuesta=resp
            expect(respuesta).toEqual({estado:"nook"})
            }
        )
    })
})
