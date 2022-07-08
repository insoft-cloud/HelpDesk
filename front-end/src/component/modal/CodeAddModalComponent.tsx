import "component/modal/Modal.css";

function CodeAddModalComponent({open,close,modalSize,header,event,cdNo,setCdNo,cdNm,setCdNm}){
    return(
        <div className={open?'openModal modal' : 'modal'}>
            {open?(
                <section className={modalSize}>
                    <header>
                        <span>{header}</span>
                        <button className="close" onClick={close}>
                            {''} &times;{''}
                        </button>
                        
                        <hr />
                    </header>
                    <div>

                        <form>
                            <div className="row mb-3">
                                <div className="col-md-3 align-self-center">코드 번호 </div>
                                <div className="col-md-9"><input className="form-control border border-secondary w-75" type="text" name="cdNo" onChange={(e)=>setCdNo(e.target.value)} value={cdNo}/></div>
                            </div>
                            <div className="row">
                            <div className="col-md-3 align-self-center">항목 이름 </div>
                            <div className="col-md-9"><input className="form-control border border-secondary w-75" type="text" name="name" onChange={(e)=>setCdNm(e.target.value)} value={cdNm}/></div>
                            </div>
                            
                        </form>
                    </div>
                    <footer className="d-flex justify-content-center">
                    <button className="btn btn-xs ms-2" onClick={event}>추가</button>
                        <button className="btn btn-xs ms-2" onClick={close}>닫기</button>
                    </footer>
                </section>
            ):null}
        </div>
    )
}
export default CodeAddModalComponent;
