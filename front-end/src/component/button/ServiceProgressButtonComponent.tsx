import React from "react";

function ServiceProgressButtonComponent(){
    return (
        <>
            <button className="btn btn-lg btn-primary col-sm-6 col-md-4 col-lg-4 m-3">
                <a className="btn btn-lg text-white"  href="{() => false}" target="_blank" rel="noopener noreferrer">
                    서비스 요청 진행사항 확인
                </a>
            </button>
        </>
        
    );
}

export default ServiceProgressButtonComponent

