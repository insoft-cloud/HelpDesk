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

export function procGetAxiosParameter(url, token, contentType : string, param, callback : Function ){
    axios.get(url, {
        headers: {
            'Content-Type' : contentType,
            'X-AUTH-TOKEN' : token
        }
    })
        .then(function (response){
            callback(response['data'], param);
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
            if(typeof error.response.data === "object") {
                errorCallback("예상치 못한 문제가 발생했습니다.")
            } else {
                errorCallback(error.response.data)
            }
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
            if(typeof error.response.data === "object") {
                errorCallback("예상치 못한 문제가 발생했습니다.")
            } else {
                errorCallback(error.response.data)
            }
        })
        .finally(function (){

        });
}

export function procDeleteAxios(url, token, contentType : string, callback : Function ){
    axios.delete(url, {
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


export function procDeleteAxiosHeader(url : string, header : AxiosRequestHeaders, callback : Function ){
    axios.delete(url, {
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

export function procPatchAxios(url, token, contentType : string, data : any, callback : Function, errorCallback : Function ){

    axios.patch(url,data,{
        headers: {
            'Content-Type' : contentType,
            'X-AUTH-TOKEN' : token
        }
    })
        .then(function (response){
            callback(response['data']);
        })
        .catch(function (error){
            if(typeof error.response.data === "object") {
                errorCallback("예상치 못한 문제가 발생했습니다.")
            } else {
                errorCallback(error.response.data)
            }
        })
        .finally(function (){

        });
}

export function procPatchAxiosHeader(url : string, header : AxiosRequestHeaders, callback : Function, errorCallback : Function ){
    axios.patch(url, {
        headers: header
    })
        .then(function (response){
            callback(response['data']);
        })
        .then(function (error:any){
            if(typeof error.response.data === "object") {
                errorCallback("예상치 못한 문제가 발생했습니다.")
            } else {
                errorCallback(error.response.data)
            }
        })
        .then(function (){

        });
}
