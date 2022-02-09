import axios, {AxiosRequestHeaders} from "axios";



axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.withCredentials = true;


export function procGetAxios(url, token, contentType : string, callback : Function ){
    axios.get(url, {
        headers: {
            'Content-Type' : contentType,
            'X-AUTH-TOKEN' : token
        }
    })
        .then(function (response){
            callback(response['data']);
        })
        .then(function (error:any){

        })
        .then(function (){

        });
}


export function procGetAxiosHeader(url : string, header : AxiosRequestHeaders, callback : Function ){
    axios.get(url, {
        headers: header
    })
        .then(function (response){
            callback(response['data']);
        })
        .then(function (error:any){

        })
        .then(function (){

        });
}

export function procPostAxios(url, token, contentType : string, data : any, callback : Function, errorCallback : Function ){

    axios.post(url,data,{
        headers: {
            'Content-Type' : contentType,
            'X-AUTH-TOKEN' : token
        }
    })
        .then(function (response){
            callback(response['data']);
        })
        .catch(function (error){
            errorCallback(error)
        })
        .finally(function (){

        });
}

export function procPostAxiosHeader(url :string, header: AxiosRequestHeaders,data : any, callback : Function, errorCallback : Function ){
    axios.post(url,data,{
        headers: header
    })
        .then(function (response){
            callback(response['data']);
        })
        .catch(function (error){
            errorCallback(error)
        })
        .finally(function (){

        });
}