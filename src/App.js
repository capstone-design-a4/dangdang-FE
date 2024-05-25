import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import SignUp from './SignUp';
import Login from './Login.js';
import SocialKakao from './kakaologin.js';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage.js';
import SignFormPage from './SignFormPage.js';
import LoginFormPage from './LoginFormPage.js';
import SearchIDPage from './SearchIDPage.js';
import SearchPwForm from './SearchPwForm.js';
import LogoutHomePage from './LogoutHomePage.js';
import RecommendedMenu from './RecommendedMenu.js';
import MenuCard from './MenuCard.js';
import BrandPage from './BrandPage.js';
import LoginHomePage from './LoginHomePage.js';
import StarToday from './StarToday.js';
import StarPage from './StarPage.js';
import TodayPage from './TodayPage.js';
import CommunityPage from './CommunityPage.js';
import PostPage from './PostPage.js';
import CommentPage from './CommentPage.js';
import StarbucksPage from './StarbucksPage.js';
import MyPage from './MyPage.js';

import './login.css';
import './sign.css';
import './sign_form.css';
import './login_form.css';
import './searchid_form.css';
import './searchpw_form.css';
import './modal.css';
import './logouthomepage.css';
import './brand.css';
import './loginhomepage.css';
import './star.css';
import './community.css';
import './post.css';
import './comment.css';
import './starbuckspage.css';
import './mypage.css';
import axios from 'axios';

function KakaoLoginPage() {
    return (
        <div>
            <SocialKakao />
        </div>
    );
}

function NotFoundPage() {
    return <div>404 Not Found</div>;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserId = localStorage.getItem('userId');
    
        if (storedIsLoggedIn && storedUserId) {
            setIsLoggedIn(storedIsLoggedIn === 'true');
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn);
        console.log("name:", userId);
    }, [isLoggedIn, userId]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
    };

    const handleLogin = (userId) => {
        setIsLoggedIn(true);
        setUserId(userId);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId);
    }

    return (
        <Router>
            <div>
                <Navbar isLoggedIn={isLoggedIn} name={userId} onLogout={handleLogout} />
                <Routes>
                    <Route path="/kakaologinpage" element={<KakaoLoginPage />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signuppage" element={<SignUpPage />} />
                    <Route path="/loginpage" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/signformpage" element={<SignFormPage />} />
                    <Route path="/loginformpage" element={<LoginFormPage onLogin={handleLogin} />} />
                    <Route path="/searchidpage" element={<SearchIDPage />} />
                    <Route path="/searchpwform" element={<SearchPwForm />} />
                    <Route path="/" element={<Navigate to="/logouthomepage" />} />
                    <Route path="/logouthomepage" element={<LogoutHomePage />} />
                    <Route path="/recommendedmenu" element={<RecommendedMenu />} />
                    <Route path="/menucard" element={<MenuCard />} />
                    <Route path="/brandpage" element={<BrandPage />} />
                    <Route path="/loginhomepage" element={<LoginHomePage />} />
                    <Route path="/startoday" element={<StarToday />} />
                    <Route path="/starpage" element={<StarPage />} />
                    <Route path="/todaypage" element={<TodayPage />} />
                    <Route path="/communitypage" element={<CommunityPage />} />
                    <Route path="/postpage" element={<PostPage />} />
                    <Route path="/commentpage" element={<CommentPage />} />
                    <Route path="/starbuckspage" element={<StarbucksPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
