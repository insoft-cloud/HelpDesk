import { Link } from 'react-router-dom'
import { API_DOMAIN_PATH, ContextPath } from 'utils/ContextPath'

export default function ErrorPageComponent() {
  return (
 
    <section className="section">
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100">
          <div className="py-8 py-md-11">
            
            <h1 className="display-2 fw-bold text-center text-gray-800">
              죄송합니다.
            </h1>

            <p className="mb-5 text-center text-muted">
              요청하신 페이지를 찾을 수 없습니다.<br/>
              페이지가 존재하지 않거나, 현재 이동할 수 없는 페이지 입니다.<br/>
            </p>

            <div className="text-center">
              <Link to={ContextPath(API_DOMAIN_PATH.main)} className="btn btn-primary btn-sm">
                메인으로
              </Link>
            </div>

          </div>
        </div>
      </div> 
    </section>
  )
}

