import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPwForm() {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);


    const handlePasswordReset = async () => {
        if (!password || !passwordCheck) {
            setErrorModalMessage('비밀번호를 입력해주세요.');
            setShowErrorModal(true);
            return;
        }
    
        if (password.length < 8 || password.length > 12 || !(/[a-zA-Z]/.test(password)) || !(/[0-9]/.test(password))) {
            setErrorModalMessage('비밀번호는 8자에서 12자 사이이고, <br> 영문자와 숫자를 조합해야 합니다.');
            setShowErrorModal(true);
            return;
        }
    
        if (password !== passwordCheck) {
            setErrorModalMessage('비밀번호가 일치하지 않습니다.');
            setShowErrorModal(true);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/member/setPassword', null, {
                params: {
                    password: password,
                    passwordCheck: passwordCheck
                },
                headers: {
                    'accept': '*/*'
                }
            });
    
            if (response.data === "비밀번호가 재설정 되었습니다.") {
                setShowModal(true);
            } else {
                setErrorModalMessage('비밀번호 재설정 실패: ' + response.data);
                setShowErrorModal(true);
            }
        } catch (error) {
            setErrorModalMessage('Error resetting password: ' + error.message);
            setShowErrorModal(true);
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
    
            {showErrorModal && (
                <div className="error_modal">
                    <div className="error_modal_content">
                        <span className="close" onClick={() => setShowErrorModal(false)}>&times;</span>
                        <div className="error-message" dangerouslySetInnerHTML={{__html: errorModalMessage}}></div>
                    </div>
                </div>
            )}
        </div>
    );    
}

export default SearchPwForm;