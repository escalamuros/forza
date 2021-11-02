
export interface Usuario{
    nombre?:string;
    apellidos?:string;
    rut?:string;
    correoElectronico?:string;
    sms?:string;
    tipoLogin:string;
    logeado:boolean;

    productos?:any;
    linea?:any[];
    tipoLinea?:string;
    customerIdLinea?:string;
    idLinea?:string;
    productIdLinea?:string;
    statusLinea?:string;
    subscriptionIdLinea?:string;
}
