import React from 'react';
import { Link } from 'react-router-dom';

function BrandPage() {
    return (
        <div>
            <div className="brand_ment">당당의 인기 프랜차이즈</div>

            <div className="brand">
                <Link to = '/starbuckspage'><img src="starbucks.png" alt="스타벅스 로고" /></Link>
                <a href="#"><img src="mega.png" alt="메가 로고" /></a>
                <a href="#"><img src="compose.png" alt="컴포즈 로고" /></a>
                <a href="#"><img src="baek.png" alt="빽다방 로고" /></a>
                <a href="#"><img src="ediya.png" alt="이디야 로고" /></a>
                <a href="#"><img src="hollys.png" alt="할리스 로고" /></a>
                <a href="#"><img src="theventi.png" alt="더벤티 로고" /></a>
                <a href="#"><img src="gongcha.png" alt="공차 로고" /></a>
                <a href="#"><img src="cheongja.png" alt="청자다방 로고" /></a>
                <a href="#"><img src="bulk.png" alt="벌크 로고" /></a>
            </div>
        </div>
    );
}

export default BrandPage;
