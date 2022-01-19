import HomeComponent from 'domain/main/HomeComponent';
import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HeaderComponent from "./component/layout/HeaderComponent";
import {ContextPath} from "./utils/ContextPath";
import LoginComponent from "./domain/login/LoginComponent";
import DashBoardComponent from "./domain/service/dashboard/DashBoardComponent";
import AdminMainComponent from "./component/admin/AdminMainComponent";
import FooterComponent from "./component/layout/FooterComponent";
import {useTokenState} from "./utils/TokenContext";
import PrivateRoute from "./component/route/PrivateRoute";

function App() {

    const state = useTokenState();

    return (
        <BrowserRouter>
            {
                state.page === "LOGIN" ? null : <HeaderComponent/>
            }
            <Routes>
                <Route path={ContextPath("")} element={<PrivateRoute component={HomeComponent} status={state}/>}/>
                    <Route path={ContextPath("/login")} element={<LoginComponent/>}/>
                    <Route path={ContextPath("/dashBoard")} element={<PrivateRoute component={DashBoardComponent} status={state}/>}/>
                    <Route path={ContextPath("/admin")} element={<PrivateRoute component={AdminMainComponent} status={state}/>}/>
            </Routes>
            {
                state.page === "LOGIN" ? null : <FooterComponent/>
            }
        </BrowserRouter>
);
}

export default App;



