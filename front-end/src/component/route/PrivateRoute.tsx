import { Navigate } from 'react-router-dom'
import React, {useState} from "react";
import {TokenContext, useTokenDispatch} from "../../utils/TokenContext";
import {ContextPath} from "../../utils/ContextPath";
import {AxiosRequestHeaders} from "axios";
import {procPostAxiosHeader} from "../../axios/Axios";



interface Props {
    component: React.ComponentType
    status : TokenContext
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent ,status  }) => {
    let dispatch = useTokenDispatch()
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
                procPostAxiosHeader("/refresh-token",header,null, callback);
            }
        }
        return null;
    }


    function callback(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
            tokenExpired: data['tokenExpired'] });
        sessionStorage.setItem("refreshToken", data['refreshToken']);
        sessionStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        return <Navigate to={ContextPath("/login")} />
    }
}


export default PrivateRoute