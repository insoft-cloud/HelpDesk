

/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-02-14
 * @author      : 김지인
 * @description : 날짜별 조회 버튼 컴포넌트
 */

import { useState } from "react";



export default function DayButtonComponent({day, setDay}) {

  const [color, setColor] = useState<string>('btn btn-outline-primary btn-xs mb-1 m-1')
  const [base] = useState<string>('btn btn-outline-primary btn-xs mb-1 m-1')
  const [clicked] = useState<string>('btn btn-primary btn-xs mb-1 m-1')

  return (
      <>    
      <button className={day === "?day=day" ? color : base } onClick={()=> {setDay("?day=day"); setColor(clicked);}} >오늘</button>
      <button className={day === "?day=week" ? clicked : base } onClick={()=> {setDay("?day=week");  setColor(clicked); }}>1주일</button>
      <button className={day === "?day=month" ? color : base } onClick={()=> {setDay("?day=month");  setColor(clicked); }}>1개월</button>
      <button className={day === "?day=all" ? color : base } onClick={()=> {setDay("?day=all");  setColor(clicked);}}>전체</button>
      </>

  )
}
