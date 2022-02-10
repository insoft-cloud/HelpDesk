import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenState } from "utils/TokenContext";

const ServiceDetailComponent = ( data ) =>{

  const { id } = useParams();

  // const matchId = data.find(function(data){ return data.id === id })

  const [dataA, setData] = useState();

  useEffect(function () {

    axios.get('/user/service/request/1c101206-1568-416f-b82c-b81255378639')
    // axios.get(`/user/service/request/${id}`)
    .then(({data}) => {
      setData(data)
      console.log(data)
    })
      .catch(error => {
      console.log(error)
    })
  }, [id])


    return (
      <>
        <div>
          <h3>서비스 요청 상세 정보</h3>
        </div>
        {
          data ? (
            <>
              <div>
                {'상태'} {'서비스 제목'} 
                <button>수정</button>
              </div>
              <div>
                  <div>
                    요청자 : {'요청자명'}
                    시스템 : {'시스템명 ex:중소벤처24'}
                    요청일 : {'요청일 2020/10/11 13:13:13'}
                    <p>
                    {dataA} 
                    </p>
                  </div>
                  <div>
                    첨부파일
                  </div>
              </div>
              <div>
                서비스 관리
                유형 
              </div>
              </>
          ) : '목록에서 개별 요청건을 선택하면 상세 정보가 표시됩니다.'
        }
        
      </>
    );
  }




export default ServiceDetailComponent;
