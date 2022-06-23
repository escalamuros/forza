import { Injectable } from '@angular/core';
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
    providedIn: 'root'
})
export class ProxyFirebaseService {

    constructor() { }

    inicio(){
        firebase.init().then(() => {
            console.log("[ProxyFirebaseService]firebase iniciado")
        })
    }

    tageo(evento:string,parametros?){
        if(parametros){
            firebase.analytics.logEvent({key:evento,parameters:[{key:"b",value:"c"}]})
        } else{
            firebase.analytics.logEvent({key:evento})
        }

    }
}
