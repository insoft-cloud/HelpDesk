import LoginInterface from "./LoginInterface";


export default class LoginModel implements LoginInterface{
    password: string = "";
    userId: string = "";

    constructor(id,password) {
        this.userId = id;
        this.password = password;
    }
}

export type SignUp = {
    "userId" : string,
    "password" : string,
    "agencyCode" : string,
    "departmentName" : string,
    "jobCode" : string,
    "rankCode" : string,
    "username" : string,
    "email" : string,
    "phoneNumber" : string,
    "informationCollectionYN" : string,
    "termsAgrYN" : string,
    "joinConfirmYN" : string
}