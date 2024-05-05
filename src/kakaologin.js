import React from 'react';
import './kakaologin.css'

const SocialKakao = () => {
    const Rest_api_key=process.env.REACT_APP_REST_API_KEY; // 본인 REST_API 입력
    const redirect_uri = 'http://localhost:3000/auth';

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    }

    const currentPage = window.location.pathname;
    
    const buttonText = currentPage === '/loginsign' ? '카카오로 간편 로그인' : '카카오로 간편가입하기';

    return (
        <button onClick={handleLogin} className="kakao_ment">{buttonText}</button>
    );
}

export default SocialKakao;