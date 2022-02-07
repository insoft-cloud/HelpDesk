
function AdminButtonComponent( {btnName,className,onEventHandler}: any) {

    return(
        <button className={className} 
        onClick= { onEventHandler } >
            {btnName}
        </button>
    )
}

export default AdminButtonComponent; 