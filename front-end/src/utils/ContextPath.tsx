export const ContextPath = (url : string) => {
    return process.env.REACT_APP_CONTEXT_PATH + url
}

export const API_SIGN_PATH = "/sign";
export const API_USER_PATH = "/user";

export const API_ADMIN_PATH = {
    main : "/admin",
    edit : "/codeEdit",
}


export const API_DOMAIN_PATH = {
    main : "",
    serviceAll : "/serviceAll",
    notice : "/notice",
    myWork : "/myWork", 
    myRequest : "/myRequest"
}