export const ContextPath = (url : string) => {
    return process.env.REACT_APP_CONTEXT_PATH + url.replace(process.env.REACT_APP_CONTEXT_PATH+"", "");
}

export const API_SIGN_PATH = "/sign";
export const API_USER_PATH = "/user";

export const API_LOGIN = {
    singIn : "/signIn",
    singUp : "/singUp",
    findId : "/findId",
    findPw : "/findPw",
    resetPw : "/resetPw"
}

export const API_MYPAGE = {
    profile : "/profile",
    alert : "/alert"
}

export const API_ADMIN_PATH = {
    codeGroup : "/codeGroup",
    codeDetail : "/codeDetail",
    managerList : "/managerList",
    managerRegist: "/managerRegist",
    memberManage: "/memberManage",
    complimentStat : "/complimentStat",
}


export const API_DOMAIN_PATH = {
    main : "/",
    serviceAll : "/serviceAll",
    notice : "/notice",
    noticeDetail : '/noticeDetail',
    newNotice : "/notice/new",
    myWork : "/myWork", 
    myRequest : "/myRequest",
    
    serviceRequest: "/serviceRequest"

}