import React, { useEffect, useContext } from 'react';
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
import SearchIdForm from './SearchIdForm.js';
import SearchPwForm from './SearchPwForm.js';
import LogoutHomePage from './LogoutHomePage.js';
import RecommendedMenu from './RecommendedMenu.js';
import MenuCard from './MenuCard.js';
import BrandPage from './BrandPage.js';
import LoginHomePage from './LoginHomePage.js';
import StarToday from './StarToday.js';
import StarPage from './StarPage.js';
import TodayPage from './TodayPage.js';
import PostPage from './PostPage.js';
import StarbucksPage from './StarbucksPage.js';
import ComposePage from './ComposePage.js';
import MegaPage from './MegaPage.js';
import BaekPage from './BaekPage.js';
import EdiyaPage from './EdiyaPage.js';
import HollysPage from './HollysPage.js';
import TheventiPage from './TheventiPage.js';
import GongchaPage from './GongchaPage.js';
import CheongjaPage from './CheongjaPage.js';
import CoffeebeanPage from './CoffeebeanPage.js';
import MyPage from './MyPage.js';
import TemPwForm from './TemPwForm.js';
import CustomChartLegend from './CustomChartLegend.js';
import CustomChartTooltip from './CustomChartTooltip.js';
import CustomStatChart from './CustomStatChart.js';
import UserContext, { UserProvider } from './UserContext';

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
import './post.css';
import './starbuckspage.css';
import './composepage.css';
import './megapage.css';
import './baekpage.css';
import './ediyapage.css';
import './hollyspage.css';
import './theventipage.css';
import './gongchapage.css';
import './cheongjapage.css';
import './coffeebeanpage.css';
import './mypage.css';
import './tempwform.css';

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
    const { user, handleLogin, handleLogout } = useContext(UserContext);

    useEffect(() => {
        console.log("isLoggedIn:", user.isLoggedIn);
        console.log("name:", user.email);
    }, [user]);

    return (
        <Router>
            <div>
                <Navbar isLoggedIn={user.isLoggedIn} name={user.email} onLogout={handleLogout} />
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
                    <Route path="/searchidform" element={<SearchIdForm />} />
                    <Route path="/searchpwform" element={<SearchPwForm />} />
                    <Route path="/" element={<Navigate to="/logouthomepage" />} />
                    <Route path="/logouthomepage" element={<LogoutHomePage />} />
                    <Route path="/recommendedmenu" element={<RecommendedMenu />} />
                    <Route path="/menucard" element={<MenuCard />} />
                    <Route path="/brandpage" element={<BrandPage />} />
                    <Route path="/loginhomepage" element={<LoginHomePage userId={user.userId} />} />
                    <Route path="/startoday" element={<StarToday />} />
                    <Route path="/starpage" element={<StarPage />} />
                    <Route path="/todaypage" element={<TodayPage />} />
                    <Route path="/postpage" element={<PostPage />} />
                    <Route path="/starbuckspage" element={<StarbucksPage />} />
                    <Route path="/composepage" element={<ComposePage />} />
                    <Route path="/megapage" element={<MegaPage />} />
                    <Route path="/baekpage" element={<BaekPage />} />
                    <Route path="/ediyapage" element={<EdiyaPage />} />
                    <Route path="/hollyspage" element={<HollysPage />} />
                    <Route path="/theventipage" element={<TheventiPage />} />
                    <Route path="/gongchapage" element={<GongchaPage />} />
                    <Route path="/cheongjapage" element={<CheongjaPage />} />
                    <Route path="/coffeebeanpage" element={<CoffeebeanPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/tempwform" element={<TemPwForm />} />
                    <Route path="/customchartlegend" element={<CustomChartLegend />} />
                    <Route path="/customcharttooltip" element={<CustomChartTooltip />} />
                    <Route path="/customstatchart" element={<CustomStatChart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default function MainApp() {
    return (
        <UserProvider>
            <App />
        </UserProvider>
    );
}