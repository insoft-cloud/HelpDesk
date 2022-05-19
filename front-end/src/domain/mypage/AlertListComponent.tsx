import "./AlertListComponent.css";
import {useState} from "react";
import React from "react";
import ServiceDetailComponent from "../service/detail/ServiceDetailComponent";
import ServiceComentComponent from "../service/detail/ServiceComentComponent";
import moment from "moment";
import QuillEditorComponent from "../../component/qill/QuillEditorComponent";
import AttachServiceComponent from "../../component/attach/AttachServiceComponent";

function AlertListComponent({data, condition}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [header] = useState("상세 내용")
    const [modalData, setModalData] = useState(<></>)

    function openModal(i) {
        if(condition.linkColumn !== '') {

            setModalData(
                <>
                    {data.map(e=>{
                        return(
                        e.id===i?
                            <>
                                <h5>{e.ttl}</h5>
                                <hr/>
                                <div className="fs-sm">
                                    <dl className="row mb-0">
                                        <dt className="col-auto">요청자</dt>
                                        <dd className="col-6 ms-n5"> {e.reqNm} </dd>
                                    </dl>
                                    <dl className="row mb-0">
                                        <dt className="col-auto">요청일</dt>
                                        <dd className="col-6 ms-n5"> {moment(e.registDt).format("YYYY/MM/DD HH:MM")} </dd>
                                    </dl>
                                    <hr className="card-meta-divider"/>
                                    <div className="border-white ql-editor bg-gray-200 border-light border border-4"
                                         dangerouslySetInnerHTML={{__html: e.cnts}}/>
                                </div>
                            </>
                            :null
                        )
                    })}
                </>
            )
            setModalOpen(true)
        } else {
            closeModal()
        }
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    function AlertHistoryModalComponent (open, close, header, modalData) {
        return (
            <div className={open ? 'openModal modal fade show' : 'modal'} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                {
                    open ?
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">{header}</h5>
                                </div>
                                <div className="modal-body">
                                    {modalData}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>닫기</button>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }

    return (
        <>
        <ul className="list-group">
            {data.map( (e, index) => {
                return (
                    condition.conditionNmList.indexOf(e[condition.conditionColNm]) !== -1
                    ?
                        <li key={index} className="d-flex justify-content-between list-group-item" onClick={ () => {openModal(e[condition.linkColumn])}}>
                            <div className="col-1 align-self-center">
                                {condition.conditionNmList.map((aa, index) => {
                                    return e[condition.conditionColNm] === aa
                                        ? <div className={condition.conditionClsNmList[index]} key={index}>
                                            {condition.conditionValList[index]}
                                          </div>
                                        : null
                                })}
                            </div>
                            <div className="col-11">
                                <div className="d-flex justify-content-between col align-items-center">
                                    {
                                        e[condition.tyCd] !== "" ?
                                            <div className="mb-0">
                                                <span className="h6 text-uppercase fw-bold">
                                                {e[condition.tyCd]}
                                                </span><br/>
                                                {
                                                    e[condition.ttl] !== "" ?
                                                    e[condition.ttl]
                                                    : null
                                                }
                                            </div>
                                            : e[condition.ttl] !== "" ?
                                                <div className="mb-0">
                                                    {e[condition.ttl]}
                                                </div>
                                            : null
                                    }
                                    <div className="fs-sm text-muted mb-0 text-end">
                                        {e[condition.registDt].slice(0,10)}
                                    </div>
                                </div>
                                {
                                    condition.cnts !== ''
                                        ? <div className="fs-sm mt10">
                                            {e[condition.cnts]}
                                          </div>
                                        : null
                                }
                            </div>
                        </li>
                        : null
                )
            })}
        </ul>
        {condition.linkColumn !== '' ? AlertHistoryModalComponent(modalOpen, closeModal, header, modalData) : null}
        </>
    )
}

export default AlertListComponent;
