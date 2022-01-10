import "reflect-metadata"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"

import {ProxyHttpclientService} from "../app/aplicacion/proxy/proxy.httpclient.service"
import {HttpClient} from "@angular/common/http"

describe("proxy de httpclient service:",()=> {
    let proxyHttp: ProxyHttpclientService
    let httpSpy
    beforeEach(()=>{
        console.log("[test]antes de cada IT")
        nsTestBedBeforeEach([], [HttpClient])
    })
    afterEach(()=>{
        console.log("[test]despues de cada IT")
        nsTestBedAfterEach(false)})
    xit("fn post, http error", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        //requiere otro tipo de paso de respuesta erronea para que la tome como error
        httpSpy.post.and.returnValue(of({status:"400"}))
        proxyHttp.post({url:"algo",body:{a:"a",b:"b"},options:{header:{c:"c",d:"d"}}}).subscribe(res => {
            expect(res).toEqual(jasmine.anything())
            expect(res.error).toEqual("true")
        })
    })
    it("fn post, http ok", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        httpSpy.post.and.returnValue(of({datos:{campo1:"si",campo2:"no"}}))
        proxyHttp.post({url:"algo",body:{a:"a",b:"b"},options:{header:{c:"c",d:"d"}}}).subscribe(res => {
            expect(res).toEqual(jasmine.anything())
            expect(res.datos).toEqual({campo1:"si",campo2:"no"})
        })
    })
    it("fn errorApi,timeout",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({name:"TimeoutError"}).subscribe(resp=>{
            expect(resp.error).toEqual("true")
            expect(resp.tipo).toEqual("timeout")
        })
    })
    it("fn errorApi,peticion",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"400"}).subscribe(resp=>{
            expect(resp.error).toEqual("true")
            expect(resp.tipo).toEqual("peticion")
        })
    })
    it("fn errorApi,servidor",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"500"}).subscribe(resp=>{
            expect(resp.error).toEqual("true")
            expect(resp.tipo).toEqual("servidor")
        })
    })
    it("fn errorApi,desconocido",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"600"}).subscribe(resp=>{
            expect(resp.error).toEqual("true")
            expect(resp.tipo).toEqual("desconocido")
        })
    })

})


