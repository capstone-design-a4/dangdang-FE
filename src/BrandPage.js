import React from 'react';
import { Link } from 'react-router-dom';

function BrandPage() {
    return (
        <div>
            <div className="brand_ment">당당의 인기 프랜차이즈</div>

            <div className="brand">
                <Link to="/starbuckspage"><img src="starbucks.png" alt="스타벅스 로고" /></Link>
                <Link to="/megapage"><img src="mega.png" alt="메가 로고" /></Link>
                <Link to="/composepage"><img src="compose.png" alt="컴포즈 로고" /></Link>
                <Link to="/baekpage"><img src="baek.png" alt="빽다방 로고" /></Link>
                <Link to="/ediyapage"><img src="ediya.png" alt="이디야 로고" /></Link>
                <a href="/hollyspage"><img src="hollys.png" alt="할리스 로고" /></a>
                <a href="/theventipage"><img src="theventi.png" alt="더벤티 로고" /></a>
                <a href="/gongchapage"><img src="gongcha.png" alt="공차 로고" /></a>
                <a href="/cheongjapage"><img src="cheongja.png" alt="청자다방 로고" /></a>
                <a href="/coffeebeanpage"><img src="coffeebean.png" alt="커피빈 로고" /></a>
            </div>
        </div>
    );
}

export default BrandPage;
