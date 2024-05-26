import React from 'react';
import { Link } from 'react-router-dom';
// import SocialKakao from './kakaologin.js';

function SignUp() {
    return (
        <div className="login_sign">
            {/* <div className="kakao_sign">
                <SocialKakao />
            </div> */}
            <div className="email_sign">
                <div className="email_ment"><Link to="/signformpage">회원가입하기</Link></div>
            </div>
        </div>
    );
}

export default SignUp;