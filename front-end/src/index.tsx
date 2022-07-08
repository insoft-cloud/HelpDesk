import ReactDOM from 'react-dom';
import 'assets/css/theme.bundle.css';
import "./assets/css/mapbox-gl.css";
import 'component/layout/HeaderComponent.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {TokenProvider} from "./utils/TokenContext";
import React from "react";



const rootElement = document.getElementById('root');

ReactDOM.render(

        <TokenProvider>
            <App/>
        </TokenProvider>,

    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();