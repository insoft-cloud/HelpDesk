import React from "react";
import {procGetAxios, procPostAxios} from "../../axios/Axios";



function NewServiceRequestButtonComponent(){

    return (
        <>
            <button className="btn btn-lg btn-primary-soft col-sm-6 col-md-4 col-lg-4 m-3" onClick={testClick}>
                <a className="btn btn-lg text-black"  href="{() => false}" target="_blank" rel="noopener noreferrer">
                    신규 서비스 요청 작성
                </a>
            </button>
        </>
    );
}

function testClick(){
    let data = {
        "userId" : "test",
        "password" : "test1234",
        "role" : "user",
        "username" : "test"
    }
    procPostAxios("http://localhost:8080/signin","","application/json", data,testResult);
}

function testResult(data : any){
    console.log(data);
}
export default NewServiceRequestButtonComponent

