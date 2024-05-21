import React from 'react';
import { Link } from 'react-router-dom';

function BrandPage() {
    return (
        <div>
            <div className="brand_ment">당당의 인기 프랜차이즈</div>

            <div className="brand">
                <Link to = '/starbuckspage'><img src="스타벅스로고.png" alt="스타벅스 로고" /></Link>
                <a href="#"><img src="메가로고.png" alt="메가 로고" /></a>
                <a href="#"><img src="컴포즈로고.png" alt="컴포즈 로고" /></a>
                <a href="#"><img src="빽다방로고.png" alt="빽다방 로고" /></a>
                <a href="#"><img src="이디야로고.png" alt="이디야 로고" /></a>
                <a href="#"><img src="할리스로고.png" alt="할리스 로고" /></a>
                <a href="#"><img src="더벤티로고.png" alt="더벤티 로고" /></a>
                <a href="#"><img src="공차로고.png" alt="공차 로고" /></a>
                <a href="#"><img src="청자로고.png" alt="청자다방 로고" /></a>
                <a href="#"><img src="벌크로고.png" alt="벌크 로고" /></a>
            </div>
        </div>
    );
}

export default BrandPage;
