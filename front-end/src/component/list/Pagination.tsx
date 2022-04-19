import React from "react";

function Pagination({ numPages, page, setPage, setChkArr}) {

  return (
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <button className={"page-item page-link " + (page===1?"page-link":"")} onClick={() => {setPage(page - 1); setChkArr([])} } disabled={page === 1}>&lt;</button>
        </li>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <li className="page-item" key={i + 1}>
              <button className={"page-item page-link "+(page===i+1?'bg-primary text-white':'')} onClick={() => {setPage(i + 1); setChkArr([])}}>
                {i + 1}
              </button> 
            </li>
          ))}
      <li className="page-item">
        <button className={"page-item page-link " + (page===numPages ?"page-link":"")} onClick={() => {setPage(page + 1); setChkArr([])}} disabled={page === numPages}> &gt;</button>
      </li>
    </ul>
  );
}


export default Pagination;