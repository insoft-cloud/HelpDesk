

/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-02-14
 * @author      : 김지인
 * @description : 날짜별 조회 버튼 컴포넌트
 */


export default function DayButtonComponent({ setDay}) {
  return (
      <>    
      <button className="btn btn-outline-primary btn-xs mb-1" onClick={()=> setDay("?day=day")}>오늘</button>
      <button className="btn btn-outline-primary btn-xs mb-1" onClick={()=> setDay("?day=week")}>1주일</button>
      <button className="btn btn-outline-primary btn-xs mb-1" onClick={()=> setDay("?day=month")}>1개월</button>
      <button className="btn btn-outline-primary btn-xs mb-1" onClick={()=> setDay("?day=all")}>전체</button>
      <button type="button" className="btn btn-primary btn-xs mb-1">
        <span data-bs-toggle="tooltip" data-placement="top" title="통계">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"/>
        <path d="M5 19h15a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 112 0v15z" fill="#fff"/>
        <path d="M8.73 14.684a1 1 0 11-1.46-1.368l3.75-4a1 1 0 011.38-.077l2.959 2.526 3.856-4.885a1 1 0 011.57 1.24l-4.5 5.7a1 1 0 01-1.434.14l-3.024-2.58-3.097 3.304z" fill="#fff" opacity=".6"/>
            </g>
            </svg>
         </span>
       </button>
      </>

  )
}
