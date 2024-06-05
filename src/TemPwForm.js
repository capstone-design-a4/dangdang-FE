import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TemPwForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // 임시 비밀번호 전송 함수
    const handleSendTempPw = async () => {
        try {
            const response = await axios.post('http://localhost:8080/sendEmail', null, {
                params: {
                    name: name,
                    phone: phoneNumber,
                    email: email,
                },
                headers: {
                    'accept': '*/*'
                }
            });
            if (response.data === '임시 비밀번호가 발송되었습니다.') {
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error sending temporary password:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/loginformpage');
    };

    return (
        <div>
            <div className="sign">임시 비밀번호 전송</div>

            <div className="form_box">
                <div className="form">
                    <input
                        type="text"
                        className="name"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="tel"
                        className="telnum"
                        placeholder="핸드폰번호(-없이 입력해주세요)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="email"
                        className="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="button" className="sendtempw_button" onClick={handleSendTempPw}>
                    임시 비밀번호 전송
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal_content">
                        <p>임시 비밀번호가 발송되었습니다.</p>
                        <button onClick={closeModal}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TemPwForm;
