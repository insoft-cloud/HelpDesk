import React from "react";

function TableComponent({tableClassName, tableData} : any) {
        return (
            <div className="card-body">
                <div className='table-responsive'>
                    <table className={tableClassName}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
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

TableComponent.defaultProps={
    tableClassName: 'table'
}

export default TableComponent