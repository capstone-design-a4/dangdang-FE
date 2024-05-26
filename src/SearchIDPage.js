import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchIdForm from './SearchIdForm';

function SearchIDPage() {
    const [phoneNumber, setPhoneNumber] = useState(''); // 핸드폰 번호를 위한 상태
    const [name, setName] = useState(''); // 이름을 위한 상태
    const [foundId, setFoundId] = useState(''); // 찾은 아이디를 위한 상태

    // 아이디 찾기 함수
    const handleSearchId = async () => {
        try {
            // API를 호출하여 아이디를 찾음
            const response = await axios.get('http://localhost:8080/api/member/info', {
                headers: {
                    'X-Auth-Username': 'user',
                    'X-Auth-Authorities': 'USER_ROLE'
                }
            });
            const foundId = response.data.id; // 찾은 아이디

            // 찾은 아이디를 상태에 저장
            setFoundId(foundId);
        } catch (error) {
            console.error('Error searching for ID:', error);
        }
    };

    return (
        <div>
            <div className="sign">아이디 찾기</div>

            <div className="form_box">
                <div className="form">
                    <input
                        type="tel"
                        className="telnum"
                        placeholder="핸드폰번호(-없이 입력해주세요)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        className="name"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="button" className="searchid_button" onClick={handleSearchId}>
                    아이디 찾기
                </button>

                <button type="button" className="login_button">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>

            </div>

            {/* 아이디가 찾아진 경우에만 표시 */}
            {foundId && <SearchIdForm userId={foundId} />} {/* SearchIdForm 컴포넌트 렌더링 */}
        </div>
    );
}

export default SearchIDPage;
