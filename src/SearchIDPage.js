import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchIDPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    // 아이디 찾기 함수
    const handleSearchId = async () => {
        try {
            const response = await axios.get('http://3.38.119.135:8080/findEmail', {
                params: {
                    name: name,
                    phone: phoneNumber,
                },
                headers: {
                    'accept': '*/*'
                }
            });
            const foundEmail = response.data.email;

            navigate('/searchidform', { state: { email: foundEmail } });
        } catch (error) {
            console.error('Error searching for email:', error);
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
        </div>
    );
}

export default SearchIDPage;
