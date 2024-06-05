import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginFormPage({ onLogin }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = {
                email: e.target.email.value,
                password: e.target.password.value,
            };
            const response = await axios.post('http://localhost:8080/login', {}, { params, withCredentials: true });
   
            if (response.status === 200) {
                // 로그인 성공
                onLogin(params.email);
                window.location.href = '/loginhomepage';
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
                        <li><Link to="/tempwform">임시 비번 전송</Link></li>
                    </ul>
                </div>
            </div>

            {showModal && (
                <div className="modal login-modal">
                    <div className="modal-content login-modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                    </div>
                </div>
            )}

        </form>
    );
}

export default LoginFormPage;
