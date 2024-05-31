import React, { useState } from 'react';
import axios from 'axios';

function SignFormPage() {
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const joinData = {
                email: e.target.email.value,
                password: e.target.password.value,
                passwordCheck: e.target.passwordCheck.value,
                name: e.target.name.value,
                gender: e.target.gender.value,
                phone: e.target.phone.value // phoneNumber를 phone으로 변경
            };

            const response = await axios.post('http://localhost:8080/join', joinData);

            console.log(response.data);

            setIsSignUpSuccess(true);

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                console.error('No response received:', error.request);
                setErrorMessage('서버로부터 응답이 없습니다.');
            } else {
                console.error('Error setting up the request:', error.message);
                setErrorMessage('요청 설정 중 오류가 발생했습니다.');
            }

            setShowModal(true);
        }
    };

    return (
        <div>
            <div className="sign">회원가입</div>
            <div className="form_box">
                <div className="message">
                    <div className="input_message">입력사항</div>
                    <div className="important_message">(필수)</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <input type="email" className="email" name="email" placeholder="이메일 주소" required />
                        <input type="password" className="password" name="password" placeholder="비밀번호(8자~12자, 영문+숫자)" required />
                        <input type="password" className="password" name="passwordCheck" placeholder="비밀번호 재입력(8자~12자, 영문+숫자)" required />
                        <input type="text" className="name" name="name" placeholder="이름" required />
                        <input type="tel" className="phonenumber" name="phone" placeholder="핸드폰번호(-없이 입력해주세요)" required /> {/* name 속성을 phone으로 변경 */}
                        <select name="gender" className="gender" required>
                            <option value="MALE">남자</option>
                            <option value="FEMALE">여자</option>
                        </select>
                    </div>
                    <button type="submit" className="sign_button">회원가입</button>
                </form>
            </div>

            {/* 회원가입 실패 모달 */}
            {showModal && (
                <div className="sign-modal">
                    <div className="sign-modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                        <div className="retry_message">다시 시도해주세요.</div>
                    </div>
                </div>
            )}

            {/* 회원가입 성공 모달 */}
            {isSignUpSuccess && (
                <div className="sign-modal">
                    <div className="sign-modal-content">
                        <span className="close" onClick={() => setIsSignUpSuccess(false)}>&times;</span>
                        <div className="success_message">회원가입을 성공하였습니다.</div>
                        <button className="modal_login_button" onClick={() => window.location.href = '/loginformpage'}>로그인하러 가기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignFormPage;
