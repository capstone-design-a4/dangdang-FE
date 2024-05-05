import React from 'react';
import { Link } from 'react-router-dom'; // BrowserRouter에서 Link를 바로 불러옵니다.
import './navbar.css';

function Navbar({ isLoggedIn, name, onLogout }) {
    return (
        <div className="nav">
            <div className="nav_logo">
                <img src="당당이.png" alt="로고" className="logo_img" />
                <Link to="/logouthomepage" style={{ fontWeight: "bold" }}>당당</Link>
            </div>
            <ul className="nav_menu">
                <li><Link to="/loginhomepage" className="home">홈</Link></li>
                <li><Link to="/mypage" className="mypage">마이페이지</Link></li>
                <li><Link to="/communitypage" className="community">커뮤니티</Link></li>
            </ul>
            <ul className="nav_login">
                {isLoggedIn ? (
                    <>
                        <li><span>{name}님</span></li>
                        <li><a href="#">|</a></li>
                        <li><a href="#" onClick={onLogout}>로그아웃</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/loginpage">로그인</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/signuppage">회원가입</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
