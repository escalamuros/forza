
export interface Usuario{
    nombre?:string;
    genero?:string;
    rut?:string;
    tipoLogin:string;
    logeado:boolean;

    linea?:any[];
    tipoLinea?:string;
    customerIdLinea?:string;
    idLinea?:string;
    productIdLinea?:string;
    statusLinea?:string;
    subscriptionIdLinea?:string;

    accessToken?:string;
    refreshToken?:string;
    mcssToken?:string;
    tiempoVenceAccessToken?:number;
}
