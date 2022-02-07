import React from "react";

function TableComponent({tableClassName, tableData, data} : any) {
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
                        {data}
                    </table>
                </div>
            </div>
        );
}

TableComponent.defaultProps={
    tableClassName: 'table'
}

export default TableComponent