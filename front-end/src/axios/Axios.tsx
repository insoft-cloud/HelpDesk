import axios from "axios";

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
        .then(function (error){

        })
        .then(function (){

        });
}


export function procPostAxios(url, token, contentType : string, data : any, callback : Function ){
    axios.post(url,data,{
        headers: {
            'Content-Type' : contentType,
            'X-AUTH-TOKEN' : token
        }
    })
        .then(function (response){
            callback(response['data']);
        })
        .then(function (error){

        })
        .then(function (){

        });
}
