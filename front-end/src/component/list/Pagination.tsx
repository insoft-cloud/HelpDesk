import React from "react";

function Pagination({ total, limit, page, setPage, chkArr, setChkArr}) {
  const numPages = Math.ceil(total / limit);
  function test(){
    if(chkArr!=null){
      chkArr.clear()
      setChkArr(chkArr);
    }
    
}
  return (
      <ul className="pagination pagination-sm justify-content-center">
        <li>
          <button className={"page-item page-link " + (page===1?"text-white":"")} onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
        </li>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <li key={i + 1}>
              <button className={"page-item page-link "+(page===i+1?'bg-primary text-white':'')} onClick={() => {setPage(i + 1); test()}}>
                {i + 1}
              </button> 
            </li>
          ))}
      <li>
        <button className={"page-item page-link " + (page===numPages ?"text-white":"")} onClick={() => setPage(page + 1)} disabled={page === numPages}> &gt;</button>
      </li>
    </ul>
  );
}


export default Pagination;