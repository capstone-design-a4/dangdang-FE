import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchIdForm() {
    const location = useLocation();
    const email = location.state?.email || '';

    // 'email'가 문자열인지 확인 후, '@' 기준으로 앞부분만 사용하여 username 설정
    const username = typeof email === 'string' ? email.split('@')[0] : '';

    return (
        <div>
            <div className="search">아이디 찾기</div>

            <div className="form_box">
                <div className="box">{username}님의 아이디는 {email}입니다.</div>

                <button type="button" className="login_button">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>
            </div>
        </div>
    );
}

export default SearchIdForm;
