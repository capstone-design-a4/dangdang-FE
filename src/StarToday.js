import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';

function StarToday() {
    return (
        <div className="star_today">
            <div className="first_line"></div>
            <div className="star_name_plus">
                <div className="star_name">즐겨찾기</div>
                <Link to="/starpage" className="star_plus">더보기</Link>
            </div>

            <div className="star_container">
                <div className="star">
                    <MenuCard
                        imageSrc="아이스카푸치노.png"
                        brand="스타벅스"
                        name="아이스 카푸치노"
                        sugar="9g"
                        caffeine="127mg"
                    />
                </div>
                <div className="star_right">
                    <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", fontSize: '40px' }} />
                    <button className="star_click">담기</button>
                </div>
            </div>

            <div className="middle_line"></div>
            <div className="today_name_plus">
                <div className="today_name">오늘 마신 음료</div>
                <Link to="/todaypage" className="today_plus">더보기</Link>
            </div>

            <div className="today_container">
                <div className="today">
                    <MenuCard
                        imageSrc="아이스얼그레이티.png"
                        brand="스타벅스"
                        name="아이스 얼 그레이 티"
                        sugar="0g"
                        caffeine="53mg"
                    />
                </div>
                <div className="today_right">
                    <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", fontSize: '40px' }} />
                    <button className="today_click">삭제</button>
                </div>
            </div>

            <div className="last_line"></div>
        </div>
    );
}

export default StarToday;