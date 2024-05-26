import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar({ isLoggedIn, name, onLogout }) {
    const username = name.split('@')[0];
    const homePage = isLoggedIn ? "/loginhomepage" : "/";

    return (
        <div className="nav">
            <div className="nav_logo">
                <img src="dangdang.png" alt="로고" className="logo_img" />
                <Link to={homePage} style={{ fontWeight: "bold" }}>당당</Link>
            </div>
            <ul className="nav_menu">
                <li><Link to={homePage} className="home">홈</Link></li>
                <li><Link to="*" className="mypage">마이페이지</Link></li>
                <li><Link to="*" className="community">커뮤니티</Link></li>
            </ul>
            <ul className="nav_login">
                {isLoggedIn ? (
                    <>
                        <li><span>{username}님</span></li>
                        <li><a href="#">|</a></li>
                        <li><a href="/" onClick={onLogout}>로그아웃</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/loginformpage">로그인</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/signuppage">회원가입</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
