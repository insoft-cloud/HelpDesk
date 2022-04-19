
/**
 * @Project     : HelpDesk
 * @FileName    : DashBoardComponent.tsx
 * @Date        : 2022-02-14
 * @author      : 김지인
 * @description : 도메인 상단에 출력되는 타이틀 컴포넌트
 */


export default function TittleComponent({tittle, subTittle}) {
  return (
    <div>
        <header className="pt-7 pb-7 d-md-block overlay overlay-black overlay-60 header_bg">
           <div className="content_wrap">
           <div className="row align-items-center">
           <div className="col text-center">
                <h1 className="fw-bold text-white mb-2">{tittle}</h1>
                <p className="fs-lg text-white-75 mb-0">{subTittle}</p>            
            </div>
            </div>
            </div>
        </header>
    </div>
  )
}
