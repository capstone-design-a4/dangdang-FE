import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecommendedMenu from './RecommendedMenu';

function LogoutHomePage() {
    // 현재 날짜를 표시할 상태
    const [currentDate, setCurrentDate] = useState("");

    // 컴포넌트가 처음 렌더링될 때 현재 날짜를 설정
    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setCurrentDate(`${year}년 ${month}월 ${day}일`);
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="hello_box">
                    <div className="date">{currentDate} 목표!</div>
                    <img src="dangdang.png" alt="로고" className="hello_logo" />
                    <div className="hello_user">
                        <div className="hello_dang">0g</div>
                        <div className="hello_ment">더 마실 수 있어요!</div>
                    </div>
                    
                    <div className="logout_dang_caf_kcal">
                        <div className="logout_dang">
                            <img src="dang.png" alt="당 이미지" className="dang_img" />
                            <div className="logout_dang_graph">0g</div>
                        </div>

                        <div className="logout_caf">
                            <img src="caffeine.png" alt="카페인 이미지" className="caf_img" />
                            <div className="logout_caf_graph">0mg</div>
                        </div>

                        <div className="logout_kcal">
                            <img src="kcal.png" alt="칼로리 이미지" className="kcal_img" />
                            <div className="logout_kcal_graph">0kcal</div>
                        </div>
                    </div>

                    <button onClick={() => { window.location.href = '/loginpage' }} className="login_sign_btn">로그인 | 회원가입</button>
                </div>
                <RecommendedMenu />
            </div>

            <div className="bbrand">
                <div className="bbrand_ment_plus">
                    <div className="bbrand_ment">당당의 인기 프랜차이즈</div>
                    <Link to="#" className="bbrand_plus">더보기</Link>
                </div>

                <div className="bbrand_top5">
                    <Link to="#"><img src="starbucks.png" alt="스타벅스 로고" /></Link>
                    <a href="#"><img src="mega.png" alt="메가 로고" /></a>
                    <a href="#"><img src="compose.png" alt="컴포즈 로고" /></a>
                    <a href="#"><img src="baek.png" alt="빽다방 로고" /></a>
                    <a href="#"><img src="ediya.png" alt="이디야 로고" /></a>
                </div>
            </div>
        </div>
    );
}

export default LogoutHomePage;
