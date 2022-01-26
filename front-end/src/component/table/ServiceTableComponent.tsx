import axios from "axios";
import React from "react";

function ServiceTableComponent({tableClassName, tableData} : any) {
    
        return (
            <div className="card-body">
                <div className='table-responsive'>
                    <table className={tableClassName}>
                        <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">시스템</th>
                            <th scope="col">제목</th>
                            <th scope="col">요청일</th>
                            <th scope="col">요청자</th>
                            <th scope="col">담당자</th>
                            <th scope="col">상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((table_data : any, index : number) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{table_data.firstname}</td>
                                <td>{table_data.lastname}</td>
                                <td>{table_data.testValue}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}

ServiceTableComponent.defaultProps={
    tableClassName: 'table'
}

export default ServiceTableComponent