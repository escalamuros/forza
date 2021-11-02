
export interface Sesion{
    creada:boolean;
    accessToken?:string;
    refreshToken?:string;
    mcssToken?:string;
    tiempoVenceAccessToken?:number;
}
