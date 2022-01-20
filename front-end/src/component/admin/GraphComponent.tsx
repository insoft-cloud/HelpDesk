import axios from "axios";
import { procPostAxios } from "axios/Axios";
import { response, Router } from "express";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";

function GraphComponent({tableClassName, tableData, arr} : any) {

    const limit = 4; // 표시될 컨텐츠 수
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    return (
        <div>
            <div className="table-responsive table-bordered">
                <table className="table table-sm text-center  border-dark" >
                    <thead className="table-secondary border-dark ">
                        <tr  >
                        <th scope="col" className="col-md-1">#</th>
                        <th scope="col" className="col-md-2">코드</th>
                        <th scope="col">항목</th>
                        <th scope="col" className="col-md-2">등록자</th>
                        <th scope="col" className="col-md-2">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.slice(offset,offset+limit).map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row">{index}</td>
                            <td>{table_data.CD_GRP_NO}</td>
                            <td>{table_data.CD_NM}</td>
                            <td>{table_data.USER_ID}</td>
                            <td>{table_data.REGIST_DT}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>                           
            </div>

            {/* 페이징처리 */}
            <div className="justify-content-center">
               <Pagination total={tableData.length} limit={limit} page={page} setPage={setPage} />
            </div>
            
        </div>
    );
}

GraphComponent.defaultProps={
    tableClassName: 'table'
}

export default GraphComponent;

