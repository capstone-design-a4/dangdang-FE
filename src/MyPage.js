import React, { useState } from 'react';

function MyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [sugarValue, setSugarValue] = useState('');
    const [caffeineValue, setCaffeineValue] = useState('');

    const openGoalModal = () => {
        setIsGoalModalOpen(true);
    };

    const closeGoalModal = () => {
        setIsGoalModalOpen(false);
    };

    const handleConfirm = () => {
        closeModal();
        // 확인 버튼을 누르면 값을 저장하고 모달을 닫기
        // 여기서는 콘솔에 출력하지만 필요한 경우 상태를 업데이트하고 화면에 반영
        console.log('당 수치:', sugarValue);
        console.log('카페인 수치:', caffeineValue);
    };

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    return (
        <div>
            <div className="page">
                <div className="page_left">
                    <div className="page_box">
                        <img src={previewUrl || "당당이.png"} alt="당당 프로필" className="login_img" />
                    </div>

                    <div className="my_name">당을줄이자 님</div>
                    <div className="button_list">
                        <button onClick={openModal} className="imagechange_button">프로필 변경</button>
                        <button onClick={openGoalModal} className="goal_setting">목표설정하기</button>
                        <div className="goal">
                            <div className="goal_text">목표 설정</div>
                            <p className="goal_sugar">25g</p>
                            <p className="goal_caffeine">300mg</p>
                        </div>
                        <button onClick={openInfoModal} type="button" className="information_edit">회원정보수정</button>
                        <button type="button" className="logout_button">로그아웃</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="profilechange">프로필 변경</div>
                        <div className="profile_img">
                            {previewUrl ? (
                                <img src={previewUrl} alt="프로필 이미지" />
                            ) : (
                                <img src="당당이.png" alt="당당 프로필" />
                            )}
                        </div>
                        <div className="file_select">
                            <input type="file" onChange={handleFileChange} className="file_button" />
                        </div>
                        <button type="button" onClick={handleConfirm} className="yes_button">확인</button>
                    </div>
                </div>
            )}

            {isGoalModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeGoalModal}>&times;</span>
                        <div className="modal_goal_ment">목표설정하기</div>

                        <div className="input_goal">
                            <div className="input_dang">
                                <input
                                    type="text"
                                    className="input_dang_ment"
                                    value={sugarValue}
                                    onChange={(e) => setSugarValue(e.target.value)}
                                />
                                <div className="input_dang_g">g</div>
                            </div>
                            <div className="input_caf">
                                <input
                                    type="text"
                                    className="input_caf_ment"
                                    value={caffeineValue}
                                    onChange={(e) => setCaffeineValue(e.target.value)}
                                />
                                <div className="input_caf_mg">mg</div>
                            </div>
                        </div>

                        <div className="eat_ment">※일일 권장 당류, 카페인 섭취량</div>

                        <div className="dang_men_women">
                            <div className="men">
                                <div className="men_ment">남성</div>
                                <div className="men_dang">37g</div>
                            </div>

                            <div className="dang_men_women_line"><a href="#">|</a></div>

                            <div className="women">
                                <div className="women_ment">여성</div>
                                <div className="women_dang">25g</div>
                            </div>
                        </div>

                        <div className="caf_men_women">
                            400mg
                        </div>

                        <div className="modal_buttons">
                            <button type="submit" className="ok_modal_button">확인</button>
                        </div>
                    </div>
                </div>
            )}

            {isInfoModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeInfoModal}>&times;</span>
                        <div className="infochange">회원정보 수정</div>

                        <div className="input-container">
                            <input type="text" className="name" name="name" placeholder="이름" />
                            <input type="tel" className="phonenumber" name="phonenumber" placeholder="핸드폰번호(-없이 입력해주세요)" />
                            <input type="email" className="email" name="email" placeholder="이메일 주소" />
                            <select name="gender" className="gender">
                                <option value="MALE">남자</option>
                                <option value="FEMALE">여자</option>
                            </select>
                        </div>

                        <div className="modal_buttons">
                            <button type="submit" className="ok_modal_button">확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPage;
