import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link 컴포넌트 추가

function LoginFormPage() {
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

    // 모달 닫기 함수
    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = {
                loginId: e.target.email.value,
                password: e.target.password.value,
            };
            console.log(params);
            const response = await axios.post('http://localhost:8080/login', {}, { params });
    
            console.log(response);
            if (response.status === 200) {
                // 로그인 성공
                window.location.href = '/loginhomepage'; // 로그인 후 이동할 페이지
            } else {
                // 로그인 실패
                setErrorMessage(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('로그인 중 오류가 발생했습니다.');
            setShowModal(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="logo">
                    <div className="center_logo">
                        <img src="dangdang.png" alt="로고" className="logo_img" />
                        <div className="logo_ment">당당</div>
                    </div>

                    <div className="logo_message">
                        <div>로그인하고</div>
                        <div>오늘도 당당하게</div>
                    </div>
                </div>

                <div className="login_sign">
                    <input type="email" className="id" name="email" placeholder="&emsp; 아이디" />
                    <input type="password" className="pw" name="password" placeholder="&emsp; 비밀번호" />
                </div>

                <div className="login_button_container">
                    <button type="submit" className="login_button">로그인</button>
                </div>
                
                <div className="id_pw">
                    <ul>
                        <li><Link to="/searchidpage">아이디 찾기</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/searchpwform">비밀번호 재설정</Link></li>
                    </ul>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                    </div>
                </div>
            )}
        </form>
    );
}

export default LoginFormPage;