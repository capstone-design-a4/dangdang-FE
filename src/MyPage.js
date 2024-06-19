import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import axios from 'axios';
import styled from 'styled-components';
import CustomStatChart from './CustomStatChart';

const host = window.location.hostname === "localhost"
  ? 'http://3.38.119.135:8080'
  : "/api";

const apiClient = axios.create({
  baseURL: host,
});

function MyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');

    const { user, handleLogout } = useContext(UserContext);
    const name = user.email ? user.email.split('@')[0] : '';

    const handleLogoutAndRedirect = async () => {
        localStorage.removeItem(`userImageUrl_${user.id}`);
        await handleLogout();
        navigate('/'); // logouthomepage로 이동
    };

    const [sugarGoal, setSugarGoal] = useState('');
    const [caffeineGoal, setCaffeineGoal] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRange, setDateRange] = useState('7'); // 기본값은 7일

    const [memberId] = useState(user.id);

    useEffect(() => {
        const fetchUserGoals = async () => {
            try {
                const response = await apiClient.get('/api/record/day', {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
                setSugarGoal(response.data.sugar_goal);
                setCaffeineGoal(response.data.caffeine_goal);
            } catch (error) {
                console.error('Error fetching user goals: ', error);
            }
        };

        fetchUserGoals();
    }, [user]);

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const response = await apiClient.get(`/api/member/info`, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
    
                const memberId = response.data.id;
                const responseImage = await apiClient.get(`/api/member/image/${memberId}`, {
                    responseType: 'blob',
                    headers: {
                        'accept': 'image/jpeg'
                    }
                });
    
                const imageURL = URL.createObjectURL(responseImage.data);
                setImageUrl(imageURL);
                localStorage.setItem(`userImageUrl_${memberId}`, imageURL);
            } catch (error) {
                console.error('Error fetching user image: ', error);
            }
        };
    
        fetchUserImage();
    }, [user.id, user.email, user.authorities]);
    

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

    const setGoal = async () => {
        if (user.isLoggedIn) {
            try {
                const response = await apiClient.put(`/api/record/goal?sugar_goal=${sugarGoal}&caffeine_goal=${caffeineGoal}`, {}, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
                console.log(response.data);
                if (response.status === 200) {
                    setIsModalOpen(false);
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleConfirm = () => {
        if (previewUrl) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            apiClient.post('/api/member/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    console.log('File uploaded successfully');
                    setImageUrl(previewUrl); // 업로드된 이미지를 즉시 반영
                    localStorage.setItem(`userImageUrl_${memberId}`, previewUrl); // 저장소에도 반영
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
        setIsProfileModalOpen(false);
    };

    const handlePasswordReset = () => {
        navigate('/searchpwform');
    };

    const handlePresetDateChange = (days) => {
        setDateRange(days);
        setStartDate('');
        setEndDate('');
    };

    const handleCustomDateChange = () => {
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
                        <img src={imageUrl ? imageUrl : "dangdang.png"} alt="당당 프로필" className="login_img" />
                    </div>

                    <div className="my_name">{name}</div>
                    <div className="button_list">
                        <div className="sugar">
                            <img src="dangbw.png" alt="당함량 이미지" className="dang_img"/>
                            <p className="goal_sugar">{sugarGoal}g</p>
                        </div>

                        <div className="caffeine">
                            <img src="caffeinebw.png" alt="카페인함량 이미지" className="caf_img"/>
                            <p className="goal_caffeine">{caffeineGoal}mg</p>
                        </div>
                            
                        <div className="boxup">
                            <div className="imgedit_box" onClick={openProfileModal}>
                                <img src="imgedit.png" alt="프로필변경 이미지" className="imgedit_img"/>
                                프로필 변경
                            </div>

                            <div className="goalset_box" onClick={openModal}>
                                <img src="goalset.png" alt="목표설정 이미지" className="goalset_img"/>
                                목표설정
                            </div>
                        </div>

                        <div className="boxdown">
                            <div className="pwdre_box" onClick={handlePasswordReset}>
                                <img src="pwdre.png" alt="비번재설정 이미지" className="pwdre_img"/>
                                비밀번호 재설정
                            </div>

                            <div className="logout_box" onClick={handleLogoutAndRedirect}>
                            <img src="logout.png" alt="로그아웃 이미지" className="logout_img"/>
                            로그아웃
                            </div>
                        </div>
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
                            <p>⭐︎png와 jpeg 형식만 삽입 가능합니다⭐︎</p>
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
                            <div className="dang_men_women_line">|</div>
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