// A complex Jasmine test
import "reflect-metadata"
import {UcIngresoService} from "../app/aplicacion/casos de uso/login/ingreso/uc-ingreso.service"
import {ApiLoginService} from "../app/dominio/servicios/api-login.service"
import {loginPorCredenciales} from "../app/dominio/interfaces/login/loginRequest"
import { nsTestBedAfterEach, nsTestBedBeforeEach, nsTestBedRender} from '@nativescript/angular/testing'
import {of} from "rxjs"
import {UsuarioService} from "../app/dominio/entidades/usuario.service"
import {SesionService} from "../app/dominio/entidades/sesion.service"
import {LineaService} from "../app/dominio/entidades/linea.service"

describe("pruebas sobre api de login service",()=> {
    let credenciales: loginPorCredenciales = {rut: "a", clave: "b"}
    let actCode:string = "abc"
    let errorPrevio={estado:"algo",tipo:"nose"}
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
        httpSpy.post.and.returnValue(of({estado: "error", tipo: "no"}))
        api.loginConCredenciales(credenciales).subscribe(res => {
            expect(res.estado).toEqual("error")
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
            expect(res.estado).toEqual("algo")
        })
    })
    it("fn userAuthorize, error en http",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({"estado": "error", "tipo":"no"}))
        api.userAuthorize(actCode).subscribe(res=>{
            expect(res.estado).toEqual("nook")
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
    it("fn tokenActivation, viene un error en servicio anterior",()=>{
        api.tokenActivation(errorPrevio).subscribe(res=>{
            expect(res.estado).toEqual("algo")
        })
    })
    it("fn tokenActivation, error en http",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({estado: "error", tipo:"no"}))
        api.tokenActivation(actCode).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    it("fn tokenActivation, http respuesta ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(httpSpy)
        httpSpy.post.and.returnValue(of({datos:{code:"abc"}}))
        api.userAuthorize(actCode).subscribe(res=>{
            expect(res).toEqual("abc")
        })
    })
})
/*describe("Caso de uso ingreso service",()=>{
    let credenciales:loginPorCredenciales={rut:"a",clave:"b"}
    let uc:UcIngresoService
    let api:ApiLoginService
    let usrSvc:UsuarioService
    let ssnSvc:SesionService
    let lnSvc:LineaService
    let ObserverSpy,HttpSpy
    beforeEach(nsTestBedBeforeEach([],[UcIngresoService,UsuarioService,SesionService]));
    afterEach(nsTestBedAfterEach(false));
    xit("Crea el servicio con un mock del httpclient que responde error",()=>{
        ObserverSpy=jasmine.createSpyObj('ApiLoginService',['IntertarloginConCredenciales'])
        HttpSpy=jasmine.createSpyObj('HttpClient',['post'])
        api = new ApiLoginService(HttpSpy)
        usrSvc= new UsuarioService()
        ssnSvc= new SesionService()
        lnSvc= new LineaService()
        uc = new UcIngresoService(api,usrSvc,ssnSvc,lnSvc)
        ObserverSpy.IntertarloginConCredenciales.and.returnValue(of({estado:"nook"}))
        //HttpSpy.post.and.returnValue(of({estado:"error en API",url:""}))
        uc.loginPorCredenciales(credenciales).subscribe(res=>{
            expect(res.estado).toEqual("error")
        })
    })
    xit("Crea el servicio con un mock del httpclient que responde ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of([{"breeds":[],"id":"cmd","url":"https://cdn2.thecatapi.com/images/cmd.jpg","width":1715,"height":1726}]))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(res.estado).toEqual("ok")
        })
    })
    xit("Crea el servicio con un mock del httpclient que responde ok",()=>{
        httpSpy=jasmine.createSpyObj('HttpClient',['get'])
        api = new ApiGatosService(httpSpy)
        uc = new UcGatosService(api)
        httpSpy.get.and.returnValue(of([{"breeds":[],"id":"cmd","url":"https://cdn2.thecatapi.com/images/cmd.jpg","width":1715,"height":1726}]))
        uc.ObtenerGatoDesdeApi().subscribe(res=>{
            expect(uc.getContador()).toBe(1)
        })
    })
})*/

