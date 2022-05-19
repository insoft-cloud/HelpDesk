import { memo, useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { procGetAxios } from "axios/Axios";
import { useTokenState } from "utils/TokenContext";
import { AuthCode, CodeDetail } from "utils/AdminCode";



/**
 * @Project     : HelpDesk
 * @FileName    : QuillEditorComponent.tsx
 * @Date        : 2022-02-25
 * @author      : 김지인
 * @description : 텍스트 에디터 컴포넌트
 */


const QuillEditorComponent = memo(({ quillRef, content, setContent, imageHandler} : any ) => {  


  const [contentType] = useState("application/json");
  const state = useTokenState();  
  const [totalData, setTotalData] = useState()
  const auth = state.auth;

    let test = [];

    let sub_data;
    
  useEffect( () => {
    if( auth === AuthCode.Admin || auth === AuthCode.Manager) {
      procGetAxios("/user/members/mention", state.token, contentType, getData) 
    } else {
      procGetAxios("/user/members/mention/"+state.user, state.token, contentType, getData) 
    }
  }, [totalData])
    
  function getData(data){
    sub_data = data
    setTotalData(data.totalElements)  
    procGetAxios("admin/group/"+CodeDetail.sysCd+"/details_list",state.token,"application.json", sysAdminCode)

  }
  function sysAdminCode(data){
    sub_data.forEach(tab => {
      data.forEach(e => {
          if(tab.psitn_instt_cd===e.cdId){
              tab.psitn_instt_cd = e.name;
          }
      })
  })

  test = sub_data.map( (i) =>  {
    return { 
      value: i.nm+`(${i.psitn_instt_cd}/${i.psitn_dept_nm})` , 
      id: i.user_id, 
      departmentName : i.psitn_dept_nm, 
      agencyCode : i.psitn_instt_cd, 
      email : i.email_addr  
    }
  } ); 
}
  const modules = useMemo(
      () => ({
          toolbar: { 
              container: [
                  ["bold", "italic", "underline", "strike"],
                  [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                  [
                      { list: "ordered" },
                      { list: "bullet" },
                      { align: [] },
                  ],                
              ],
              handlers: {
                image: imageHandler,
              },
          },
          mention: {
            allowedChars : /^[가-힣a-zA-Z]*$/,
            mentionDenotationChars: ["@"],            
            linkTarget: '_self',
            positioningStrategy : 'fixed',

            source: function(searchTerm, renderItem, mentionChar) {
              let values;  
              if (mentionChar === "@" ) {
                values = test;
              }
              if (searchTerm.length === 0) {
                renderItem(values, searchTerm);
              } else {
                const matches : any = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                  )
                  matches.push(values[i]);
                renderItem(matches, searchTerm);
              }
            }
          }
      }), []);
  return (
      <>
          <ReactQuill
              ref={(element) => {
                  if (element !== null) {
                      quillRef.current = element;
                  }
                }}
              value={content || ''}
              onChange={setContent}
              modules={modules}
              theme="snow"
              style={{height: '85%', marginBottom: '1%'}}
          />
      </>
  )
});
export default QuillEditorComponent;
