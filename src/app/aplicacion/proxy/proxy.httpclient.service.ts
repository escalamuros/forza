import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, timeout} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProxyHttpclientService {

  constructor(private _http:HttpClient) { }

  get(url):Observable<any>{
      let res:Observable<any>
      res = this._http.get("https://api.thecatapi.com/v1/images/search").pipe(
          catchError(err=>this.errorApi(err)),
          timeout(30000)
      )
      return res
  }
    errorApi(err){
        console.log("error en servicio")
        if(err.status=="400"){
            console.log("mala URL del servicio")
        }else{
            console.log("error desconosido en servicio")
        }
        return of({estado:"error en API",url:""})
    }

}
