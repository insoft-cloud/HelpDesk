import React, { forwardRef, MutableRefObject, useEffect } from "react";


//todo : 상세조회 연결까지 작업 필요
export type ServiceTableModel = {
    
    cnts : string | undefined, //내용
    priortCd : string | undefined, //우선순위
    ttl : string | undefined, //제목
    registDt: string | undefined, //등록일
    updateDt? : string | undefined, //수정일
    tyCd : string | undefined, //유형
    sysCd : string | undefined, //시스템명(ex 중소벤처)
    reqId : string | undefined //등록자(=요청자) 아이디

}


//todo : 누락된 내용(=평가 컬럼) 추가되면 재확인 필요
export type MyWorkTableModel = {
    
    cnts : string | undefined, //내용
    priortCd : string | undefined, //우선순위
    ttl : string | undefined, //제목
    registDt: string | undefined, //등록일
    updateDt? : string | undefined, //수정일
    tyCd : string | undefined, //유형
    sysCd : string | undefined, //시스템명(ex 중소벤처)
    reqId : string | undefined, //등록자(=요청자) 아이디
    goalDt : string | undefined, //목표일

    requestAttachments : {
        fileNm? : string | undefined, //담당자id
        userNm? : string | undefined, //담당자이름
        sttsCd? : string | undefined //상태(?)
    }

}


interface Props {
    indeterminate?: boolean;
  }
  
  const useCombinedRefs = (...refs: any): MutableRefObject<any> => {
    const targetRef = React.useRef();
  
    React.useEffect(() => {
      refs.forEach((ref: any) => {
        if (!ref) return;
  
        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      });
    }, [refs]);
  
    return targetRef;
  };
  
  const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
      const defaultRef = React.useRef(null);
      const combinedRef = useCombinedRefs(ref, defaultRef);
  
      useEffect(() => {
        if (combinedRef?.current) {
          combinedRef.current.indeterminate = indeterminate ?? false;
        }
      }, [combinedRef, indeterminate]);
  
      return (
        <>
          <input type="checkbox" ref={combinedRef} {...rest} />
        </>
      );
    },
  );
  
  export default IndeterminateCheckbox;
