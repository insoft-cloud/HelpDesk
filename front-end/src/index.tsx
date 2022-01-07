import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Expenses from "./domain/test/Expenses";
import Invoices from "./domain/test/Invoices";
import {ContextPath} from "./utils/ContextPath";

const rootElement = document.getElementById('root');

ReactDOM.render(

  <BrowserRouter>
      <Routes>
          <Route path={ContextPath("")} element={<App />} />
          <Route path={ContextPath("/expenses")} element={<Expenses />} />
          <Route path={ContextPath("/invoices")} element={<Invoices />} />
      </Routes>
  </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();