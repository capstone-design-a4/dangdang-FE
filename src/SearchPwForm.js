import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

function SearchPwForm() {
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 나타내는 상태
    const navigate = useNavigate(); // Navigation을 위한 훅

    const handlePasswordReset = async () => {
        try {
            // 비밀번호 재설정 요청 수행
            const response = await axios.post(`http://localhost:8080/api/member/setPassword`, null, {
                params: {
                    password: password,
                    passwordCheck: passwordCheck
                },
                headers: {
                    'accept': '*/*'
                }
            });

            // 비밀번호 재설정 성공 시 모달 표시
            if (response.data === "비밀번호가 재설정 되었습니다.") {
                setShowModal(true);
            } else {
                // 실패 시 적절한 에러 처리를 여기에 추가할 수 있습니다.
                console.error('비밀번호 재설정 실패:', response.data);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/mypage');
    };

    return (
        <div>
            <div className="sign">비밀번호 재설정</div>

            <div className="form_box">
                <div className="form">
                    <input
                        type="password"
                        className="pwd"
                        placeholder="비밀번호(8자~12자, 영문+숫자)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="pwdchk"
                        placeholder="비밀번호 재입력"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>
                <button type="submit" className="sign_button1" onClick={handlePasswordReset}>
                    비밀번호 재설정
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal_content">
                        <p>비밀번호가 재설정 되었습니다.</p>
                        <button onClick={closeModal}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchPwForm;
