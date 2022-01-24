import HomeComponent from 'domain/main/HomeComponent';
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./component/layout/HeaderComponent";
import {ContextPath} from "./utils/ContextPath";
import SignInComponent from "./domain/sign/SignInComponent";
import DashBoardComponent from "./domain/service/dashboard/DashBoardComponent";
import AdminMainComponent from "./component/admin/AdminMainComponent";
import FooterComponent from "./component/layout/FooterComponent";
import {useTokenState} from "./utils/TokenContext";
import PrivateRoute from "./component/route/PrivateRoute";
import SignUpComponent from "./domain/sign/SignUpComponent";
import MyWorkComponent from 'domain/service/dashboard/MyWorkComponent';
import AdminCodeEditComponent from 'component/admin/AdminCodeEdit';
import { table } from 'console';

function App() {

    const state = useTokenState();

    return (
        <BrowserRouter>
            {
                state.page === "LOGIN" ? null : <HeaderComponent/>
            }
            <Routes>
                <Route path={ContextPath("")} element={<HomeComponent/>}/>
                    <Route path={ContextPath("/signin")} element={<SignInComponent prePath={window.location.pathname}/>}/>
                    <Route path={ContextPath("/signup")} element={<SignUpComponent/>}/>
                    <Route path={ContextPath("/dashBoard")} element={<PrivateRoute component={DashBoardComponent} status={state}/>}/>
                    <Route path={ContextPath("/dashBoard/myWork")} element={<PrivateRoute component={MyWorkComponent} status={state}/>}/>
                    <Route path={ContextPath("/admin")} element={<PrivateRoute component={AdminMainComponent} status={state}/>}/>
                    <Route path={ContextPath("/codeEdit")} element={<PrivateRoute component={AdminCodeEditComponent } status={state}/>}/>
            </Routes>
            {
                state.page === "LOGIN" ? null : <FooterComponent/>
            }
        </BrowserRouter>
);
}

export default App;



