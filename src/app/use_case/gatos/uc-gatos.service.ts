import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcGatosService {
    private contador:number

  constructor() {
        this.contador=0
  }

}
