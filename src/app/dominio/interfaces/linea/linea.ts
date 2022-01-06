export interface Linea{
    id:string
    numero:string
    customerId:string
    tipo:string
    estadomigrado?: string
    tipoContratoOri?:string
    lineas?:any[]
}
//campos que vienen en respuesta en "token" ( token Autorization -> login )
/*
cod_sub_seg: ""
codcategoria: ""
codsegmento: ""
desc_sub_seg: ""
estadomigrado: "migrado"
id: "56961026303"
idclie: "150452435"
idcontacto: ""
idcuen: ""
permiso: {perfil: "1-0;"}
preferido: ""
rol: "Titular"
rut_titular: "17534493-4"
seleccion: ""
tipo: "MOVIL"
tipoContratoOri: "Contrato"
tipocontrato: "0"
vigente-desde: ""
*/
