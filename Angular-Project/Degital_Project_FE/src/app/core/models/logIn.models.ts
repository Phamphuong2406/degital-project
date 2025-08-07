export interface loginDataRequired {
    email: string,
    password: string,
}
export interface returnedLoginData{
    responseMessage: string,
    token: string,
    result:boolean
}