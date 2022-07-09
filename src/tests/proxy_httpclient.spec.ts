import "reflect-metadata"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"

import {ProxyHttpclientService} from "../app/aplicacion/proxy/proxy.httpclient.service"
import {HttpClient, HttpHeaders,HttpParams} from "@angular/common/http"

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
    it("fn get, http ok", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        httpSpy.get.and.returnValue(of({datos:{campo1:"si",campo2:"no"}}))
        let cabecera=new HttpHeaders({c:"c",d:"d"})
        let parametros=new HttpParams().set("a","a").set("b","b")
        proxyHttp.get({url:"algo",options:{params:parametros,headers:cabecera}}).subscribe(res => {
            expect(res).toEqual(jasmine.anything())
            expect(res.datos).toEqual({campo1:"si",campo2:"no"})
        })
    })
    it("fn post, http ok", () => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        httpSpy.post.and.returnValue(of({datos:{campo1:"si",campo2:"no"}}))
        let cabecera=new HttpHeaders({c:"c",d:"d"})
        proxyHttp.post({url:"algo",body:{a:"a",b:"b"},options:{headers:cabecera}}).subscribe(res => {
            expect(res).toEqual(jasmine.anything())
            expect(res.datos).toEqual({campo1:"si",campo2:"no"})
        })
    })
    it("fn errorApi,timeout",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({name:"TimeoutError"}).subscribe(resp=>{
            expect(resp.error).toEqual(true)
            expect(resp.tipo).toEqual("timeout")
        })
    })
    it("fn errorApi,peticion",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"400"}).subscribe(resp=>{
            expect(resp.error).toEqual(true)
            expect(resp.tipo).toEqual("peticion")
        })
    })
    it("fn errorApi,servidor",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"500"}).subscribe(resp=>{
            expect(resp.error).toEqual(true)
            expect(resp.tipo).toEqual("servidor")
        })
    })
    it("fn errorApi,desconocido",() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post'])
        proxyHttp = new ProxyHttpclientService(httpSpy)
        proxyHttp.errorApi({status:"600"}).subscribe(resp=>{
            expect(resp.error).toEqual(true)
            expect(resp.tipo).toEqual("desconocido")
        })
    })

})


