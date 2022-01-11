import React from "react";

function Button2Component(){
    return (
        <div className="row" >
            <button className="btn btn-lg btn-primary-soft col-sm-6 col-md-4 col-lg-4 m-3">
                <a className="btn btn-lg text-black"  href="{() => false}" target="_blank" rel="noopener noreferrer">
                    신규 서비스 요청 작성
                </a>
            </button>
            <button className="btn btn-lg btn-primary col-sm-6 col-md-4 col-lg-4 m-3">
                <a className="btn btn-lg text-white"  href="{() => false}" target="_blank" rel="noopener noreferrer">
                    서비스 요청 진행사항 확인
                </a>
            </button>
        </div>
        
    );
}

export default Button2Component

