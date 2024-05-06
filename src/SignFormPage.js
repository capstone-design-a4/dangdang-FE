import React, { useState } from 'react';
import axios from 'axios';

function SignFormPage() {
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false); // 회원가입 성공 여부 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태
    const [errorMessage, setErrorMessage] = useState(''); // 회원가입 실패 시 오류 메시지 상태

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const joinData = {
                loginId: e.target.email.value,
                email: e.target.email.value,
                password: e.target.password.value,
                passwordCheck: e.target.password.value,
                name: e.target.name.value,
                gender: e.target.gender.value,
                phoneNumber: e.target.phonenumber.value
            };
  
            const response = await axios.post('http://localhost:8080/join', joinData);

            console.log(response.data); // 회원가입 성공 메시지 출력

            // 회원가입 성공 시
            setIsSignUpSuccess(true);

        } catch (error) {
            // 에러 처리
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrorMessage(error.response.data.message); // 서버에서 반환된 오류 메시지 설정
            } else if (error.request) {
                console.error('No response received:', error.request);
                setErrorMessage('서버로부터 응답이 없습니다.');
            } else {
                console.error('Error setting up the request:', error.message);
                setErrorMessage('요청 설정 중 오류가 발생했습니다.');
            }

            // 회원가입 실패 시 모달 표시
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
                        <input type="email" className="email" name="email" placeholder="이메일 주소" />
                        <input type="password" className="password" name="password" placeholder="비밀번호(8자~12자, 영문+숫자)" />
                        <input type="text" className="name" name="name" placeholder="이름" />
                        <input type="tel" className="phonenumber" name="phonenumber" placeholder="핸드폰번호(-없이 입력해주세요)" />
                        <select name="gender" className="gender">
                            <option value="MALE">남자</option>
                            <option value="FEMALE">여자</option>
                        </select>
                    </div>
                    <button type="submit" className="sign_button">회원가입</button>
                </form>
            </div>

            {/* 회원가입 실패 모달 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                        <div className="retry_message">다시 시도해주세요.</div>
                    </div>
                </div>
            )}

            {/* 회원가입 성공 모달 */}
            {isSignUpSuccess && (
                <div className="modal">
                    <div className="modal-content">
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
