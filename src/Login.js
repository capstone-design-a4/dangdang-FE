import React from 'react';
import { Link } from 'react-router-dom';
// import SocialKakao from './kakaologin.js';

function Login() {
    return (
        <div className="login_sign">
            {/* <div className="kakao_login">
                <SocialKakao />
            </div> */}
            <div className="email_login">
                <div className="email_ment"><Link to="/loginformpage">로그인하기</Link></div>
            </div>
        </div>
    );
}

export default Login;