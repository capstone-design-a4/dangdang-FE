import React from 'react';
import { Link } from 'react-router-dom';

function SearchIdForm({ userId }) {
    return (
        <div>
            <div className="search">아이디 찾기</div>

            <div className="form_box">
                <div className="box">홍길동님의 아이디는 <span className="userid">{userId}</span>입니다.</div>

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
