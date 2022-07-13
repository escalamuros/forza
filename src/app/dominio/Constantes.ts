
export const rutasLogin = {
    loginCajetin: "https://apix.movistar.cl/oauth2/login-app/loginCajetin",
    userAuthorize: "https://apix.movistar.cl/oauth2/userAuthorize",
    token: "https://apix.movistar.cl/oauth2/token",
    updateContext: 'https://apix.movistar.cl/customer/V2/UpdateClientUserContext'
}

export const llave = '53c081ef-ab4b-47b0-95b4-892b2ac7d5f0'
/* para apix-dev: llave = a6eb7899-2a2d-438a-aed9-e5fa3b04aed0 */

//etapa de login: token activation (tercer paso)
export const credenciales = {
    client_id : "598d51c9-a4c1-40e8-8583-7ee4a3f16abe",
    client_secret : "b35328c4-d15b-46e7-b539-57068cc1bd29",
    redirect_uri :  "https://myloginOauth.net/auth-code",
    grant_type : "authorization_code"
}
/* para apix-dev:
client_id: b5ba8e96-9d77-4dac-85e9-20c78ecb2617
client_secret: a5ef2397-32dd-474c-b972-2b44efe32555
*/

//etapa de login: token activation (tercer paso)
export const invitado = {
    client_id: "53c081ef-ab4b-47b0-95b4-892b2ac7d5f0",
    client_secret: "TU3uShAlt24lESNL",
    redirect_uri: "https://myloginOauth.net/auth-code",
    grant_type: "authorization_code"
}

export const token = {
    coliving_prod: "NTNjMDgxZWYtYWI0Yi00N2IwLTk1YjQtODkyYjJhYzdkNWYwOjc0ZmMxZjA0LTA2NmItNGQ1My1hM2IwLWUxYzUyMzA2YjU0NQ==",
    coliving_test: "YTZlYjc4OTktMmEyZC00MzhhLWFlZDktZTVmYTNiMDRhZWQwOjkzYTJiZmU2LTU4MTktNGJlNS1iOWRlLWQ3YjI3MjZkMjA2NQ==",
    redis: "bW9uaXRvcmVvOm1vbml0b3Jlb0B0ZWxlZm9uaWNhLmNvbQ=="
}

export const rutasMantenedor = {
    mantenedor:"https://apix.movistar.cl/ParameterCatalog/V2/domains/appmimovistar/entities/",
    flag:"https://apix.movistar.cl/contentmanager/V1/content"
}

export const nombreIdEntidadesMantenedor={
    unity_modals:"",
    modales_wv: "5f0f261e5efc9c0020b68086",
}

export const parametrosFlagMantenedor = {
    apikey:"xf2oz8X7lnvFWkIDJXkfsEkUhvQaJ26g",
    consumer:"AppMovistar",
    maintainer:"flag_actualizar_mantenedor"
}
