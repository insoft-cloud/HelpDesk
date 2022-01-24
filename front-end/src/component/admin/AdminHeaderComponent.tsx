import React, { useEffect } from "react";

function AdminHeaderComponent({title,info}){
    useEffect(() => {
    import("assets/js/theme");
    }, []);
    return (
        <div>
            <h2>{title}</h2>
            <hr className="bg-dark border border-dark" />
            <p>{info}</p>
        </div>
        
    )
}
export default AdminHeaderComponent;