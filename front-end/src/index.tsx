import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import 'assets/css/theme.bundle.css';
import "./assets/css/mapbox-gl.css";
import 'component/layout/HeaderComponent.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {ContextPath} from "./utils/ContextPath";
import HeaderComponent from 'component/layout/HeaderComponent';
import FooterComponent from 'component/layout/FooterComponent';
import DashBoardComponent from 'domain/service/dashboard/DashBoardComponent';
import AdminMainComponent from 'component/admin/AdminMainComponent';


const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
            <Route path={ContextPath("")} element={<App/>}/>
            <Route path={ContextPath("/dashBoard")} element={<DashBoardComponent/>}/>
            <Route path={ContextPath("/admin")} element={<AdminMainComponent/>}/>
        </Routes>
        <FooterComponent/>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();