import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarToday from './StarToday';

function LoginHomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todayDate, setTodayDate] = useState(getTodayDate());

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

    return (
        <div className="App">
            <div className="container">
                <div className="hello_box">
                    <div className="date">{todayDate} 목표!</div>
                    <img src="당당이.png" alt="로고" className="hello_logo" />
                    <div className="hello_user">
                        <div className="hello_dang">12g</div>
                        <div className="hello_ment">더 마실 수 있어요!</div>
                    </div>

                    <div className="login_dang_caf_kcal">
                        <div className="login_dang">
                            <img src="당.png" alt="당 이미지" className="dang_img" />
                            <div className="login_dang_graph">
                                <div className="eat_dang_graph">13g</div>
                            </div>
                        </div>

                        <div className="login_caf">
                            <img src="카페인.png" alt="카페인 이미지" className="caf_img" />
                            <div className="login_caf_graph">
                                <div className="eat_caf_graph">239mg</div>
                            </div>
                        </div>

                        <div className="login_kcal">
                            <img src="칼로리.png" alt="칼로리 이미지" className="kcal_img" />
                            <div className="login_kcal_graph">
                                <div className="eat_kcal_graph">43kcal</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={openModal} className="goal_button">목표설정하기</button>
                </div>
                <StarToday />
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="modal_goal_ment">목표설정하기</div>

                        <div className="input_goal">
                            <div className="input_dang">
                                <input type="text" className="input_dang_ment" />
                                <div className="input_dang_g">g</div>
                            </div>
                            <div className="input_caf">
                                <input type="text" className="input_caf_ment" />
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

            <div className="Brand">
                <div className="Brand_ment_plus">
                    <div className="Brand_ment">당당의 인기 프랜차이즈</div>
                    <Link to="/brandpage" className="Brand_plus">더보기</Link>
                </div>

                <div className="Brand_top5">
                    <Link to="/starbuckspage"><img src="스타벅스로고.png" alt="스타벅스 로고" /></Link>
                    <a href="#"><img src="메가로고.png" alt="메가 로고" /></a>
                    <a href="#"><img src="컴포즈로고.png" alt="컴포즈 로고" /></a>
                    <a href="#"><img src="빽다방로고.png" alt="빽다방 로고" /></a>
                    <a href="#"><img src="이디야로고.png" alt="이디야 로고" /></a>
                </div>
            </div>
        </div>
    );
}

export default LoginHomePage;
