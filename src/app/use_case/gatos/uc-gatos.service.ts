import { Injectable } from '@angular/core';
import {ApiGatosService} from "../../dominio/servicios/api-gatos.service";
import {Observable, of} from "rxjs";
import {gato} from "../../interfaces/gato/gatoResponse";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UcGatosService {
    private contador:number

  constructor(private _apiGatos: ApiGatosService) {
        this.contador=0
  }

  getContador():number{
        return this.contador;
  }

  ObtenerGatoDesdeApi():Observable<gato>{
        console.log("[UCGatos]f ObtenerGatoDesdeApi,contador:"+this.contador)
      let respuesta:Observable<gato>
      if(this.contador<10){
          respuesta= this._apiGatos.obtenerGatoRemoto().pipe(
              map(response => {
                  let gatoUrl:string=''
                  let gatoEstado:string=''

                  for(let item of response){
                      if(item.url!== null){
                          gatoUrl=item.url
                          gatoEstado="ok"
                      }
                  }
                  if(gatoEstado==''){
                      gatoEstado="error"
                  }
                  return ({"estado":gatoEstado,"url":gatoUrl})
              })
          )
          this.contador++
      }else{
          respuesta= of({estado:"api colapsada",url:""})
      }
      return respuesta
  }


}
