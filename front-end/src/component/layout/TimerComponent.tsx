import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {API_MYPAGE, ContextPath} from "../../utils/ContextPath";

function TimerComponent() {
    const [minute, setMinute] = useState(60)
    const [second, setSecond] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if(!isComplete) {
            const timer = setTimeout( () => {
                if(second > 0) {
                    setSecond(second - 1)
                } else {
                    if(minute > 0) {
                        setMinute(minute - 1)
                        setSecond(59)
                    } else {
                        alert("60분간 동작하지 않아 자동으로 로그아웃 되었습니다.")
                        localStorage.removeItem("refreshToken")
                        localStorage.removeItem("refreshTokenExpired")
                        window.location.reload()
                        setIsComplete(true)
                    }
                }
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [second])

    return (
        <>
            <small>
                <b>
                    <Link style={{textDecoration: 'none'}} to={ContextPath(API_MYPAGE.profile)}>
                        ({minute < 10 ? '0' + minute : minute} : {second < 10 ? '0' + second : second})
                    </Link>
                </b>
            </small>
        </>
    )
}

export default TimerComponent
