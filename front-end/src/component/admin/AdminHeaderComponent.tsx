import React, { useEffect } from "react";

function AdminHeaderComponent({title,info}){
    useEffect(() => {
    import("assets/js/theme");
    }, []);
    return (
        <div>
            <h2 className="mt-3">{title}</h2>
            <hr className="bg-dark border border-dark" />
            <p>{info}</p>
        </div>
        
    )
}
export default AdminHeaderComponent;