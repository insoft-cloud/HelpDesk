import HomeComponent from 'domain/main/HomeComponent';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./component/layout/HeaderComponent";
import {API_ADMIN_PATH, API_DOMAIN_PATH, API_LOGIN, API_MYPAGE, ContextPath} from "./utils/ContextPath";
import SignInComponent from "./domain/sign/SignInComponent";
import FooterComponent from "./component/layout/FooterComponent";
import {useTokenState} from "./utils/TokenContext";
import PrivateRoute from "./component/route/PrivateRoute";
import SignUpComponent from "./domain/sign/SignUpComponent";
import AdminCodeGroupComponent from 'domain/admin/AdminCodeGroupComponent';
import AdminCodeDetailComponent from 'domain/admin/AdminCodeDetailComponent';
import ServiceRequestComponent from 'domain/service/ServiceRequestComponent';
import MemberManageComponent from 'domain/admin/MemberManageComponent';
import ServiceManagerListComponent from 'domain/admin/ServiceManagerListComponent';
import ComplimentStatComponent from 'domain/admin/ComplimentStatComponent';
import ServiceAllComponent from 'domain/service/common/ServiceAllComponent';
import MyWorkComponent from 'domain/service/common/MyWorkComponent';
import MyRequestComponent from 'domain/service/common/MyRequestComponent';
import NoticeComponent from 'domain/notice/NoticeComponent';
import NewNoticeComponent from 'domain/notice/NewNoticeComponent';
import AlertHistoryComponent from 'domain/mypage/AlertHistoryComponent';
import ProfileComponent from 'domain/mypage/ProfileComponent';
import NoticeDetailComponent from 'domain/notice/NoticeDetailComponent';
import FindIdComponent from 'domain/sign/FindIdComponent';
import FindPwComponent from 'domain/sign/FindPwComponent';
import ErrorPageComponent from 'domain/error/ErrorPageComponent';
import ResetPwComponent from 'domain/sign/ResetPwComponent';

function App() {

    const state = useTokenState();
    const refreshToken = localStorage.getItem('refreshToken') ?? false

    return (
        <BrowserRouter>
            {
                state.page === "LOGIN" ? null : <HeaderComponent/>
            }
            <Routes>
                <Route path={ContextPath(API_DOMAIN_PATH.main)} element={!refreshToken ? <HomeComponent/> : <PrivateRoute component={HomeComponent} status={state}/>}/>
                    <Route path={ContextPath(API_LOGIN.singIn)} element={<SignInComponent prePath={window.location.pathname} />}/>
                    <Route path={ContextPath(API_LOGIN.singUp)} element={<SignUpComponent/>}/>
                    <Route path={ContextPath(API_LOGIN.findId)} element={<FindIdComponent/>}/>
                    <Route path={ContextPath(API_LOGIN.findPw)} element={<FindPwComponent/>}/>
                    <Route path={ContextPath(API_LOGIN.resetPw)} element={<ResetPwComponent />} />
                    <Route path={ContextPath(API_DOMAIN_PATH.serviceAll)} element={<PrivateRoute component={ServiceAllComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.myWork)} element={<PrivateRoute component={MyWorkComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.myRequest)} element={<PrivateRoute component={MyRequestComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.serviceRequest)} element={<PrivateRoute component={ServiceRequestComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.notice)} element={<PrivateRoute component={NoticeComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.newNotice)} element={<PrivateRoute component={NewNoticeComponent} status={state}/>}/>
                    <Route path={ContextPath(API_DOMAIN_PATH.noticeDetail + '/:id')} element={<PrivateRoute component={NoticeDetailComponent} status={state}/>}/>
                    <Route path={ContextPath(API_ADMIN_PATH.codeGroup)} element={<PrivateRoute component={AdminCodeGroupComponent } status={state}/>}/>
                    <Route path={ContextPath(API_ADMIN_PATH.codeDetail)} element={<PrivateRoute component={AdminCodeDetailComponent } status={state}/>}/>
                    <Route path={ContextPath(API_ADMIN_PATH.managerList)} element={<PrivateRoute component={ServiceManagerListComponent } status={state}/>}/>
                    <Route path={ContextPath(API_ADMIN_PATH.memberManage)} element={<PrivateRoute component={MemberManageComponent } status={state}/>}/>
                    <Route path={ContextPath(API_ADMIN_PATH.complimentStat)} element={<PrivateRoute component={ComplimentStatComponent } status={state}/>}/>
                    <Route path={ContextPath(API_MYPAGE.alert)} element={<PrivateRoute component={AlertHistoryComponent } status={state}/>}/>
                    <Route path={ContextPath(API_MYPAGE.profile)} element={<PrivateRoute component={ProfileComponent } status={state}/>}/>

                    <Route path='*' element={<ErrorPageComponent/>}/>
                    
            </Routes>
            {
                state.page === "LOGIN" ? null : <FooterComponent/>
            }
        </BrowserRouter>
);
}

export default App;



