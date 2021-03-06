import {Navigate, useNavigate} from 'react-router-dom'
import React from "react";
import {TokenContext, useTokenDispatch} from "../../utils/TokenContext";
import {API_DOMAIN_PATH, API_SIGN_PATH, ContextPath} from "../../utils/ContextPath";
import {AxiosRequestHeaders} from "axios";
import {procPostAxiosHeader} from "../../axios/Axios";
import SignInComponent from "../../domain/sign/SignInComponent";

interface Props {
    component: React.ComponentType
    status : TokenContext
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent ,status  }) => {
    let dispatch = useTokenDispatch()
    const navigate = useNavigate()
    let refreshToken = localStorage.getItem("refreshToken")
    let refreshTokenExpired = localStorage.getItem("refreshTokenExpired")

    if (status.token !== undefined) {
        if(Number(status.tokenExpired) > Number(new Date().getTime())) {
            return <RouteComponent />
        } else {
            if(refreshToken !== null && refreshToken !== undefined) {
                let header : AxiosRequestHeaders
                header = {
                    'Content-Type' : "application/json",
                    'REFRESH-TOKEN' : refreshToken
                }
                procPostAxiosHeader(API_SIGN_PATH+"/refresh-token",header,null, callback, errorCallback)
                return null
            } else {
                return <SignInComponent prePath={window.location.pathname} />
            }
        }
    } else {
        if(refreshToken !== null && refreshToken !== undefined) {
            if(Number(refreshTokenExpired) > Number(new Date().getTime())) {
                let header : AxiosRequestHeaders
                header = {
                    'Content-Type' : "application/json",
                    'REFRESH-TOKEN' : refreshToken
                }
                procPostAxiosHeader(API_SIGN_PATH+"/refresh-token",header,null, callback, errorCallback)
                return null
            } else {
                return <SignInComponent prePath={window.location.pathname} />
            }
        } else {
            return <SignInComponent prePath={window.location.pathname} />
        }
    }


    function callback(data : any){
        dispatch({ type: 'SET_TOKEN', token: data['accessToken'],
        tokenExpired: data['tokenExpired'], user: data['userId'], name : data['userName'], auth : data['auth'], actTime : new Date().getTime().toString() });
        localStorage.setItem("refreshToken", data['refreshToken']);
        localStorage.setItem("refreshTokenExpired", data['refreshTokenExpired']);
        return <Navigate to={window.location.pathname} />
    }

    function errorCallback(error){
        alert(error);
        localStorage.clear();
        navigate(ContextPath(API_DOMAIN_PATH.main));
        return <Navigate to={ContextPath(API_DOMAIN_PATH.main)} />
    }
}


export default PrivateRoute
