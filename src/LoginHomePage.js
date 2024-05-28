import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import StarToday from './StarToday';
import axios from 'axios';
import UserContext from './UserContext';

function LoginHomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todayDate, setTodayDate] = useState(getTodayDate());
    const [sugarGoal, setSugarGoal] = useState('');
    const [caffeineGoal, setCaffeineGoal] = useState('');
    const { user } = useContext(UserContext); // 컨텍스트에서 사용자 정보 가져오기

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }
    
    const setGoal = async () => {
        if (user.isLoggedIn) { // 사용자가 로그인 되어 있을 때만 목표 설정
            try {
                const response = await axios.put(`http://localhost:8080/api/record/goal?sugar_goal=${sugarGoal}&caffeine_goal=${caffeineGoal}`, {}, {
                    headers: {
                        'X-Auth-Username': user.userId, // 사용자 정보 사용
                        'X-Auth-Authorities': user.authorities // 사용자 권한 정보 사용
                    }
                });
                console.log(response.data);
                if (response.status === 200) {
                    setTodayDate(getTodayDate()); // 목표 설정 후 오늘 날짜 갱신
                    closeModal();
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    
    return (
        <div className="App">
            <div className="container">
                <div className="hello_box">
                    <div className="date">{todayDate} 목표!</div>
                    <img src="dangdang.png" alt="로고" className="hello_logo" />
                    <div className="hello_user">
                        <div className="hello_dang">12g</div>
                        <div className="hello_ment">더 마실 수 있어요!</div>
                    </div>

                    <div className="login_dang_caf_kcal">
                        <div className="login_dang">
                            <img src="dang.png" alt="당 이미지" className="dang_img" />
                            <div className="login_dang_graph">
                                <div className="eat_dang_graph">13g</div>
                            </div>
                        </div>

                        <div className="login_caf">
                            <img src="caffeine.png" alt="카페인 이미지" className="caf_img" />
                            <div className="login_caf_graph">
                                <div className="eat_caf_graph">239mg</div>
                            </div>
                        </div>

                        <div className="login_kcal">
                            <img src="kcal.png" alt="칼로리 이미지" className="kcal_img" />
                            <div className="login_kcal_graph">
                                <div className="eat_kcal_graph">43kcal</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={openModal} className="goal_button">목표설정하기</button>
                </div>
                <StarToday isLoggedIn={user.isLoggedIn} userId={user.userId} />
            </div>

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
                            <button type="submit" className="ok_modal_button" onClick={setGoal}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="Brand">
                <div className="Brand_ment_plus">
                    <div className="Brand_ment">당당의 인기 프랜차이즈</div>
                    <Link to="/brandpage" className="Brand_plus">더보기</Link>
                </div>

                <div className="Brand_top5">
                    <Link to="/starbuckspage"><img src="starbucks.png" alt="스타벅스 로고" /></Link>
                    <a href="#"><img src="mega.png" alt="메가 로고" /></a>
                    <a href="#"><img src="compose.png" alt="컴포즈 로고" /></a>
                    <a href="#"><img src="baek.png" alt="빽다방 로고" /></a>
                    <a href="#"><img src="ediya.png" alt="이디야 로고" /></a>
                </div>
            </div>
        </div>
    );
}

export default LoginHomePage;
