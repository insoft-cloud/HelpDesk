import LoginInterface from "./LoginInterface";


export default class LoginModel implements LoginInterface{
    password: string = "";
    userId: string = "";

    constructor(id,password) {
        this.userId = id;
        this.password = password;
    }
}