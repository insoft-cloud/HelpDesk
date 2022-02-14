
export default function ServiceCountComponent({data}) {
  return (
    <div className="d-flex card shadow">
                        <div className="card-footer">
                            <div className="col_5 text-center">
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-primary">{data.length}</h3>
                                <p className="mb-0 fs-sm text-muted">전체</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-primary-desat">{data.requestHistories[0].sttsCd === 'S' ? data.length : ''}</h3>
                                <p className="mb-0 fs-sm text-muted">신규</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-success">0</h3>
                                <p className="mb-0 fs-sm text-muted">진행</p>
                            </div>
                            <div className="border-right cursor-pointer">
                                <h3 className="fs-1 text-danger">0</h3>
                                <p className="mb-0 fs-sm text-muted">완료</p>
                            </div>
                            <div className="cursor-pointer">
                                <h3 className="fs-1 text-muted">0</h3>
                                <p className="mb-0 fs-sm text-muted">보류</p>
                            </div>
                            </div>
                        </div>
                        </div>
  )
}
