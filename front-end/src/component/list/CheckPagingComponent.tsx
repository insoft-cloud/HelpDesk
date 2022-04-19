import React from "react";

function CheckPagingComponent({page, setPage, totalPages, setChkArr}) {
    const pageNumCount = 2; // 좌우로 몇개의 페이지 번호가 나오게 할 것인지 고정
    let minPageLack = 0; // 현재 페이지가 첫 페이지인 경우, 부족한 부분을 max에 더해주기 위한 Lack 변수
    let maxPageLack = 0; // 현재 페이지가 마지막 페이지인 경우, 부족한 부분을 min에 더해주기 위한 Lack 변수

    let minPageNum = page - pageNumCount; // 최소 페이지 번호 = 현재 페이지 - 좌측 페이지 노출 개수
    let maxPageNum = page + pageNumCount; // 최대 페이지 번호 = 현재 페이지 + 우측 페이지 노출 개수

    // 부족한 페이지 개수를 maxPageNum에 더해주기 위해 Lack 변수의 값을 수정함 (왼쪽 페이지 번호 부족)
    if(minPageNum < 0) {
        minPageLack = minPageNum * -1;
        minPageNum = 0;
    }
    // 부족한 페이지 개수를 minPageNum에 더해주기 위해 Lack 변수의 값을 수정함 (오른쪽 페이지 번호 부족)
    if(maxPageNum > totalPages - 1) {
        maxPageLack = totalPages - 1 - maxPageNum;
        maxPageNum = totalPages - 1;
    }

    function pageListRender() {
        const result : any[] = [];
        for(let i = minPageNum + maxPageLack; i <= maxPageNum + minPageLack; ++i) {
            if(i >= 0 && i <= totalPages - 1) {
                result.push(
                    <li className="page-item" key={i + 1}>
                        <button className={"page-item page-link" + (page === i ? ' bg-primary text-white' : '')}
                                onClick={() => {
                                    setPage(i)
                                    setChkArr([])
                                }}>
                            {i + 1}
                        </button>
                    </li>
                );
            }
        }
        return result;
    }

    return (
        <ul className="pagination pagination-sm">
            <li className="page-item">
                <button className={"page-item page-link page-link"} onClick={() => { setChkArr([]); if(page > 0)setPage(0);}}>&lt;&lt;</button>
            </li>
            <li className="page-item">
                <button className={"page-item page-link page-link"} onClick={() => { setChkArr([]); if(page > 0) setPage(page - 1);}}>&lt;</button>
            </li>
            {
                pageListRender()
            }
            <li className="page-item">
                <button className={"page-item page-link page-link"} onClick={() => { setChkArr([]); if(page < totalPages - 1) setPage(page + 1);}}>&gt;</button>
            </li>
            <li className="page-item">
                <button className={"page-item page-link page-link"} onClick={() => { setChkArr([]); if(page < totalPages - 1) setPage(totalPages - 1)}}>&gt;&gt;</button>
            </li>
        </ul>
    );
}

export default CheckPagingComponent;
