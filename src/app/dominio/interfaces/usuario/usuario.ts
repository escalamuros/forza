
export interface Usuario{
    nombre?:string;
    genero?:string;
    rut?:string;
    tipoLogin:string;
    logeado:boolean;
    linea?:any[];
    tipoLinea?:string;
    customerIdLinea?:string;
    accessToken?:string;
    refreshToken?:string;
    mcssToken?:string;
    tiempoVenceAccessToken?:number;
}
