import React, { useEffect } from "react";

function AdminHeaderComponent(){
    useEffect(() => {
    import("assets/js/theme");
    }, []);
    return (
        <div>
            <h2>서비스 코드 관리</h2>
            <hr className="bg-secondary" />
            <p>헬프 데스크 서비스 운영에 필요한 항목들을 분류하고 관리합니다.</p>
        </div>
        
    )
}
export default AdminHeaderComponent;