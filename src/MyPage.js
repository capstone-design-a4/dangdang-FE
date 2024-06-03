import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import axios from 'axios';
import styled from 'styled-components';
import UserFluctuationChart from './CustomStatChart';
import CustomStatChart from './CustomStatChart';

function MyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const { user, handleLogout } = useContext(UserContext);
    const name = user.email ? user.email.split('@')[0] : '';

    const handleLogoutAndRedirect = async () => {
        await handleLogout(); // 로그아웃 처리
        navigate('/'); // logouthomepage로 이동
    };

    const initialSugarGoal = localStorage.getItem('sugarGoal') || '';
    const initialCaffeineGoal = localStorage.getItem('caffeineGoal') || '';
    const [todayDate, setTodayDate] = useState(getTodayDate());
    const [sugarGoal, setSugarGoal] = useState(initialSugarGoal);
    const [caffeineGoal, setCaffeineGoal] = useState(initialCaffeineGoal);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRange, setDateRange] = useState('7'); // 기본값은 7일

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }

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

    const setGoal = () => {
        localStorage.setItem('sugarGoal', sugarGoal);
        localStorage.setItem('caffeineGoal', caffeineGoal);
        setTodayDate(getTodayDate());
        setIsModalOpen(false);
    };

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const handleConfirm = () => {
        if (previewUrl) {
            // 백에서 프로필 변경 api 받으면 넣기
            axios.post('http://example.com/updateProfileImage', { image: previewUrl })
                .then(response => {
                    // 이미지 업데이트 성공 시
                    console.log('프로필 이미지 업데이트 성공:', response.data);
                })
                .catch(error => {
                    // 이미지 업데이트 실패 시
                    console.error('프로필 이미지 업데이트 에러:', error);
                });
        }

        // 확인 버튼 클릭 후 프로필 모달 닫기
        setIsProfileModalOpen(false);
    };

    const handlePasswordReset = () => {
        navigate('/searchpwform'); // searchpwform으로 이동
    };

    const handlePresetDateChange = (days) => {
        setDateRange(days);
        setStartDate('');
        setEndDate('');
    };

    const handleCustomDateChange = () => {
        // 날짜가 올바른지 확인 (유효성 검사 등 추가 가능)
        if (new Date(startDate) > new Date(endDate)) {
            alert("시작 날짜가 끝나는 날짜보다 이후일 수 없습니다.");
            return;
        }
        setDateRange(null);
    };

    return (
        <div>
            <div className="page">
                <div className="page_left">
                    <div className="page_box">
                        <img src={previewUrl || "dangdang.png"} alt="당당 프로필" className="login_img" />
                    </div>

                    <div className="my_name">{name}님</div>
                    <div className="button_list">
                        <button onClick={openProfileModal} className="imagechange_button">프로필 변경</button>
                        <button onClick={openModal} className="goal_setting">목표설정하기</button>
                        <div className="goal">
                            <div className="goal_text">목표 설정</div>
                            <p className="goal_sugar">{sugarGoal}g</p>
                            <p className="goal_caffeine">{caffeineGoal}mg</p>
                        </div>
                        <button onClick={openInfoModal} type="button" className="information_edit">회원정보수정</button>
                        <button className="repw_button" onClick={handlePasswordReset}>비밀번호 재설정</button>
                        <button type="button" className="logout_button" onClick={handleLogoutAndRedirect}>
                            로그아웃
                        </button>
                    </div>
                </div>

                <PageRight className="page_right">
                    <DateContainer>
                        <Button onClick={() => handlePresetDateChange('0')}>오늘</Button>
                        <Button onClick={() => handlePresetDateChange('1')}>어제</Button>
                        <Button onClick={() => handlePresetDateChange('7')}>7일</Button>
                        <Button onClick={() => handlePresetDateChange('30')}>30일</Button>
                        <label>
                            시작 날짜:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            끝 날짜:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                        <Button onClick={handleCustomDateChange}>조회</Button>
                    </DateContainer>
                    <CustomStatChartWrapper>
                        <CustomStatChart startDate={startDate} endDate={endDate} dateRange={dateRange} />
                    </CustomStatChartWrapper>
                </PageRight>
            </div>

            {isProfileModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeProfileModal}>&times;</span>
                        <div className="profilechange">프로필 변경</div>
                        <div className="profile_img">
                            {previewUrl ? (
                                <img src={previewUrl} alt="프로필 이미지" />
                            ) : (
                                <img src="dangdang.png" alt="당당 프로필" />
                            )}
                        </div>
                        <div className="file_select">
                            <input type="file" onChange={handleFileChange} className="file_button" />
                        </div>
                        <button type="button" onClick={handleConfirm} className="yes_button">확인</button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="modal_goal_ment">목표설정하기</div>

                        <div className="input_goal">
                            <div className="input_dang">
                                <input type="text" className="input_dang_ment" value={sugarGoal} onChange={(e) => setSugarGoal(e.target.value)} />
                                <div className="input_dang_g">g</div>
                            </div>
                            <div className="input_caf">
                                <input type="text" className="input_caf_ment" value={caffeineGoal} onChange={(e) => setCaffeineGoal(e.target.value)} />
                                <div className="input_caf_mg">mg</div>
                            </div>
                        </div>

                        <div className="eat_ment">※일일 권장 당류, 카페인 섭취량</div>

                        <div className="dang_men_women">
                            <div className="men">
                                <div className="men_ment">남성</div>
                                <div className="men_dang">37g</div>
                            </div>
                            <div className="dang_men_women_line"><a href="">|</a></div>
                            <div className="women">
                                <div className="women_ment">여성</div>
                                <div className="women_dang">25g</div>
                            </div>
                        </div>
                        <div className="caf_men_women">400mg</div>
                        <div className="modal_buttons">
                            <button type="submit" className="ok_modal_button" onClick={setGoal}>확인</button>
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

const PageRight = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
`;

const CustomStatChartWrapper = styled.div`
    width: 100%;
    height: 80%;

    @media (max-width: 960px) {
        height: 50%;
        width: 90%;
    }
`;

const DateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    label {
        margin: 0 10px;
    }

    input {
        margin-left: 5px;
    }

    button {
        margin: 0 10px;
        padding: 5px 10px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        border-radius: 4px;
    }

    @media (max-width: 960px) {
        button {
            width: 40px;
            height: 30px;
            font-size: 10px;
            margin: 0 3px;
            font-weight: bold;s
        }

        input {
            width: 15px;
        }
    }
`;

const Button = styled.button`
    margin: 0 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
`;
