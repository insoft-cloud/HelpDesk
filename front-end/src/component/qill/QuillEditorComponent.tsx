import { memo, useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import { procGetAxios } from "axios/Axios";
import { useTokenState } from "utils/TokenContext";
import { CodeDetail } from "utils/AdminCode";



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
  const [data, setData] = useState([])
  const [totalData, setTotalData] = useState()
    let test = [];

    let sub_data;
    
  useEffect( () => {
    procGetAxios("/user/members?page=0&size=999", state.token, contentType, getData) 
  }, [totalData])
    
  function getData(data){
    setTotalData(data.totalElements)
    sub_data = data.content
      // test = data.content.map( (i) =>  {return { value: i.username, id: i.userId }} );
    procGetAxios("admin/group/"+CodeDetail.sysCd+"/details",state.token,"application.json", sysAdminCode)

  }
  function sysAdminCode(data){
    sub_data.forEach(tab => {
        data.content.forEach(e => {
            if(tab.agencyCode===e.cdId){
                tab.agencyCode = e.name;
            }
        })
    })
    test = sub_data.map( (i) =>  {return { value: i.username+`(${i.agencyCode}/${i.departmentName})` , id: i.userId, departmentName : i.departmentName, agencyCode : i.agencyCode, email : i.email  }} );
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
                  ['image'],
                
              ],
              handlers: {
                image: imageHandler,
              },
          },
          mention: {
            allowedChars : /^[가-힣a-zA-Z]*$/,
            mentionDenotationChars: ["@"],            
            linkTarget: '_self',
//            fixMentionsToQuill : true,
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
            //  ref={quillRef}
              ref={(element) => {
                  if (element !== null) {
                      quillRef.current = element;
                  }
                }}
              value={content || ''}
              onChange={setContent}
              modules={modules}
              theme="snow"
              style={{height: '85%', marginBottom: '1%'}} // style    
          />
      </>
  )
});
export default QuillEditorComponent;