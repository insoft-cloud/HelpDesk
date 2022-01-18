import axios from "axios";
import { procPostAxios } from "axios/Axios";
import { response, Router } from "express";
import React, { useEffect } from "react";
import { useState } from "react";

function GraphComponent({tableClassName, tableData, arr} : any) {

    // var {Client} = require('pg');
    // const pg = new Client({
    //     user: "insoft",
    //     host: "172.30.88.10",
    //     database: "postgres",
    //     password: "Insoft!23",
    //     port: 5432,
    //   });
    //   pg.connect();
    // //연결 안돼...

    // pg.query("SELECT * FROM public.tb_help_cd_grp_test", (err, res) => {
    //   if (!err) console.log(res);
    //   else console.log(err);
    //   pg.end();
    // });



    // //이거는되는데 내 데이터 가져와야지..
    // const [data, setData] = useState(null);
    // const onClick = ()=>{
    //   axios.get('https://jsonplaceholder.typicode.com/todos/1').then(reponse => {
    //     setData(reponse.data);
    //   });
    // }

//    async function getMyData() {
//     let retData = await axios.get("jdbc:postgresql://172.30.88.10:5432/postgres");
//     retData = retData.data;
//     console.log(JSON.stringify(retData));
//     this.setState({arr:retData})
//    }

   const state = {arr:[]}
    return (
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered table-sm border-dark border-collpase text-center" >
                    <thead className="table-secondary border-dark">
                        <tr  >
                        <th scope="col" className="col-md-1">#</th>
                        <th scope="col" className="col-md-2">코드</th>
                        <th scope="col">항목</th>
                        <th scope="col" className="col-md-2">등록자</th>
                        <th scope="col" className="col-md-2">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((table_data : any, index : number) => (
                        <tr key={index}>
                            <td scope="row">{index}</td>
                            <td>{table_data.firstname}</td>
                            <td>{table_data.lastname}</td>
                            <td>{table_data.testValue}</td>
                            <td>{table_data.testValue}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>                           
            </div>
            <ul className="pagination justify-content-center">
                <li className="page-item li-sm"><a className="page-link" href="{()=>false}">&#60;&#60;</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">&#60;</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">1</a></li>
                <li className="page-item active"><a className="page-link" href="{()=>false}">2</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">3</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">4</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">&#62;</a></li>
                <li className="page-item"><a className="page-link" href="{()=>false}">&#62;&#62;</a></li>
            </ul>
        </div>
    );
}

GraphComponent.defaultProps={
    tableClassName: 'table'
}

export default GraphComponent;