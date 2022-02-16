import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// type QuillEditorProps = {
//   quillRef : string;
//   htmlContent : string;
//   setHtmlContent: string;
// }


const QuillEditorComponent = ({ quillRef, htmlContent, setHtmlContent, id} ) => {
  
  const modules = useMemo(
      () => ({
          toolbar: { // 툴바에 넣을 기능
              container: [
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                  [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                      { align: [] },
                  ],
              ],
          },
      }), []);
  return (
      <>
          <ReactQuill id={id}
              // ref={quillRef}
              ref={(element) => {
                  if (element !== null) {
                      quillRef.current = element;
                  }
                }}
              value={htmlContent}
              onChange={setHtmlContent}
              modules={modules}
              theme="snow"
              style={{height: '85%', marginBottom: '6%'}} // style    
          />
      </>
  )
};
export default QuillEditorComponent;