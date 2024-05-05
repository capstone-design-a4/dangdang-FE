import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function SearchPwForm() {
    const [passwordReset, setPasswordReset] = useState(false); // 비밀번호 재설정 여부를 나타내는 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 나타내는 상태

    const handlePasswordReset = () => {
        // 비밀번호 재설정 로직을 수행한 후에 호출되는 함수
        // 여기서는 단순히 setPasswordReset(true)를 호출하여 재설정되었음을 표시
        setPasswordReset(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="sign">비밀번호 재설정</div>

            <div className="form_box">
                <div className="form">
                    <input type="text" className="form_id" placeholder="아이디" />
                    <input type="password" className="pwd" placeholder="비밀번호(8자~12자, 영문+숫자)" />
                    <input type="password" className="pwdchk" placeholder="비밀번호 재입력" />
                </div>
                <button type="submit" className="sign_button1" onClick={handlePasswordReset}>
                    비밀번호 재설정
                </button>
                <button type="submit" className="sign_button2">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>
            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <div>비밀번호가 재설정되었습니다.</div>
                </Modal>
            )}
        </div>
    );
}

export default SearchPwForm;