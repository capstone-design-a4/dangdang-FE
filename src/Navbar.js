import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import UserContext from './UserContext';

function Navbar() {
    const { user, handleLogout } = useContext(UserContext);
    const name = user.email ? user.email.split('@')[0] : ''; // email이 유효한 경우에만 사용
    const homePage = user.isLoggedIn ? '/loginhomepage' : '/';

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
                {user.isLoggedIn ? (
                    <>
                        <li><span>{name}님</span></li>
                        <li><a href="#">|</a></li>
                        <li><a href="/" onClick={handleLogout}>로그아웃</a></li>
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
