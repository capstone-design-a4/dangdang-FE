import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Question() {
    // 현재 페이지의 경로를 가져옴
    const location = useLocation();

    // 현재 경로가 '/login'인지 여부를 확인하여 문구를 설정
    const questionText = location.pathname === '/loginpage' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?';
    const buttonText = location.pathname === '/loginpage' ? '회원가입' : '로그인';
    const buttonLink = location.pathname === '/loginpage' ? '/signuppage' : '/loginpage';

    return (
        <div className="question">
            <div className="question_ment">{questionText}</div>
            <Link to={buttonLink} className="question_login">{buttonText}</Link>
        </div>
    );
}

export default Question;
