import { useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
      <ul className="pagination pagination-sm justify-content-center">
        <li>
          <button className={"page-item page-link " + (page===1?"text-white":"")} onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
        </li>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <li key={i + 1}>
             <button className={"page-item page-link "+(page===i+1?'bg-primary text-white':'')}  
                onClick={() => {setPage(i + 1)}}  aria-current={page === i + 1 ? "page" : ""}>
               {i + 1}
               </button>
              
            </li>
          ))}
        <li >
          <button className={"page-item page-link " + (page===numPages ?"text-white":"")} onClick={() => setPage(page + 1)} disabled={page === numPages}> &gt;</button>
        </li>
      </ul>
  );
}


export default Pagination;