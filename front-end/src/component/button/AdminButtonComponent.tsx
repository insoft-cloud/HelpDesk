/**
 * @Project     : HelpDesk
 * @FileName    : ButtonComponent.tsx
 * @Date        : 2022-01-20
 * @author      : 김수진
 * @description : 기존버튼컴포넌트에 이벤트 기능 추가
 */

import { Link } from "react-router-dom";

function AdminButtonComponent( {btnName,btnClassName,onEventHandler,url,path}: any) {
        // console.log('넘어와')
        // console.log(path);
    return(
        (url!="null")?<Link className={btnClassName} to={url} target="_self"  >
            {btnName}
            </Link>:
        <button className={btnClassName} 
        onClick= { onEventHandler } >
            {btnName}
        </button>
    )
}

export default AdminButtonComponent; 