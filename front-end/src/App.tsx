import HomeComponent from 'domain/main/HomeComponent';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./component/layout/HeaderComponent";
import {API_DOMAIN_PATH, ContextPath} from "./utils/ContextPath";
import SignInComponent from "./domain/sign/SignInComponent";
import AdminMainComponent from "./component/admin/AdminMainComponent";
import FooterComponent from "./component/layout/FooterComponent";
import {useTokenState} from "./utils/TokenContext";
import PrivateRoute from "./component/route/PrivateRoute";
import SignUpComponent from "./domain/sign/SignUpComponent";
import MyWorkComponent from 'domain/service/MyWorkComponent';
import AdminCodeEditComponent from 'component/admin/AdminCodeEdit';
import MyRequestComponent from 'domain/service/MyRequestComponent';
import ServiceAllComponent from 'domain/service/ServiceAllComponent';

function App() {

    const state = useTokenState();

    return (
        <BrowserRouter>
            {
                state.page === "LOGIN" ? null : <HeaderComponent/>
            }
            <Routes>
                <Route path={ContextPath(API_DOMAIN_PATH.main)} element={<HomeComponent/>}/>
                    <Route path={ContextPath("/signin")} element={<SignInComponent prePath={window.location.pathname}/>}/>
                    <Route path={ContextPath("/signup")} element={<SignUpComponent/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.serviceAll)} element={<PrivateRoute component={ServiceAllComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.myWork)} element={<PrivateRoute component={MyWorkComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.myRequest)} element={<PrivateRoute component={MyRequestComponent} status={state}/>}/>
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



