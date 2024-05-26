import React from 'react';
import { Link } from 'react-router-dom';

function SearchIdForm({ userId }) {
    // 'userId'가 문자열인지 확인 후, '@' 기준으로 앞부분만 사용하여 username 설정
    const username = typeof userId === 'string' ? userId.split('@')[0] : '';

    return (
        <div>
            <div className="search">아이디 찾기</div>

            <div className="form_box">
                <div className="box">{username}님의 아이디는 {userId}입니다.</div>

                <button type="button" className="login_button">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>
                <button type="button" className="pw_re_button">
                    <Link to="/searchpwform">비밀번호 재설정</Link>
                </button>
            </div>
        </div>
    );
}

export default SearchIdForm;
