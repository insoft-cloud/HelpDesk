import {Navigate, useNavigate} from 'react-router-dom'
import React from "react";
import {TokenContext, useTokenDispatch} from "../../utils/TokenContext";
import {API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {AxiosRequestHeaders} from "axios";
import {procPostAxiosHeader} from "../../axios/Axios";
import SignInComponent from "../../domain/sign/SignInComponent";



interface Props {
    component: React.ComponentType
    status : TokenContext
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent ,status  }) => {
    let dispatch = useTokenDispatch()
    const navigate = useNavigate();
    if (status.token !== undefined) {
        return <RouteComponent />
    }else {
        let refreshToken = sessionStorage.getItem("refreshToken");
        let refreshTokenExpired = sessionStorage.getItem("refreshTokenExpired");
        if(refreshToken !== null && refreshToken !== undefined){
            if(Number(refreshTokenExpired) > new Date().getTime())
            {
                let header : AxiosRequestHeaders;
                header = {
                    'Content-Type' : "application/json",
                    'REFRESH-TOKEN' : refreshToken
                }
                procPostAxiosHeader(API_SIGN_PATH+"/refresh-token",header,null, callback, errorCallback);
            }

            return null;
        }else {
            return <SignInComponent prePath={window.location.pathname} />
        }

    }


    function callback(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
            tokenExpired: data['tokenExpired'], user: data['userName'] });
        sessionStorage.setItem("refreshToken", data['refreshToken']);
        sessionStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        return <Navigate to={window.location.pathname} />
    }

    function errorCallback(error){
        alert(error);
        return <Navigate to={ContextPath("/signin")} />
    }
}


export default PrivateRoute