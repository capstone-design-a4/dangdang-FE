import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './login.css';
import './sign.css';
import './sign_form.css'
import './login_form.css'
import './searchid_form.css'
import './searchpw_form.css'
import SocialKakao from './kakaologin';
import logo_img from './당당이.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    return (
        <div className="nav">
            <div className="nav_logo">
                <img src={logo_img} alt="로고" className="logo_img" />
                <Link to="/" style={{ fontWeight: "bold" }}>당당</Link>
            </div>
            <ul className="nav_menu">
                <li><Link to="/" className="home">홈</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
                <li><Link to="/community">커뮤니티</Link></li>
            </ul>
            <ul className="nav_login">
                <li><Link to="/login">로그인</Link></li>
                <li><a href="#">|</a></li>
                <li><Link to="/sign">회원가입</Link></li>
            </ul>
        </div>
    );
}

function Logo({ message }) {
    return (
        <div className="logo">
            <div className="center_logo">
                <img src={logo_img} alt="로고" className="logo_img" />
                <div className="logo_ment" style={{ fontWeight: "bold" }}>당당</div>
            </div>
            <div className="logo_message">
                <div>{message}</div>
                <div>오늘도 당당하게</div>
            </div>
        </div>
    );
}

function LoginSign() {
    return (
        <div className="login_sign">
            <div className="kakao_login">
                <SocialKakao />
            </div>
            <div className="email_login">
                <div className="email_ment"><Link to="/loginformpage">이메일로 로그인</Link></div>
            </div>
        </div>
    );
}

function SignUp() {
    return (
        <div className="login_sign">
            <div className="kakao_sign">
                <SocialKakao />
            </div>
            <div className="email_sign">
                <div className="email_ment"><Link to="/signformpage">이메일로 가입하기</Link></div>
            </div>
        </div>
    );
}

function Question() {
    // 현재 페이지의 경로를 가져옴
    const location = useLocation();

    // 현재 경로가 '/login'인지 여부를 확인하여 문구를 설정
    const questionText = location.pathname === '/login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?';
    const buttonText = location.pathname === '/login' ? '회원가입' : '로그인';
    const buttonLink = location.pathname === '/login' ? '/sign' : '/login';

    return (
        <div className="question">
            <div className="question_ment">{questionText}</div>
            <Link to={buttonLink} className="question_login">{buttonText}</Link>
        </div>
    );
}

function HomePage() {
    return (
        <div>
            <Logo message="로그인하고" />
            <LoginSign />
            <Question />
        </div>
    );
}

function SignUpPage() {
    return (
        <div>
            <Logo message="회원가입하고" />
            <SignUp />
            <Question />
        </div>
    );
}

function LoginPage() {
    return (
        <div>
            <Logo message="로그인하고" />
            <LoginSign />
            <Question />
        </div>
    );
}

function NotFoundPage() {
    return <div>404 Not Found</div>;
}

function SignFormPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 폼 제출 처리 로직 추가
        // e.target을 사용하여 폼 데이터에 접근할 수 있음
    };

    return (
        <div>
            <div className="sign">회원가입</div>
            <div className="form_box">
                <div className="message">
                    <div className="input_message">입력사항</div>
                    <div className="important_message">(필수)</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <input type="email" className="email" name="email" placeholder="이메일 주소" />
                        <input type="password" className="password" name="password" placeholder="비밀번호(8자~12자, 영문+숫자)" />
                        <input type="text" className="name" name="name" placeholder="이름" />
                        <input type="tel" className="phonenumber" name="phonenumber" placeholder="핸드폰번호(-없이 입력해주세요)" />
                        <select name="gender" className="gender">
                            <option value="성별">성별</option>
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                        <input type="date" className="date" name="birthdate" />
                    </div>
                    <button type="submit" className="sign_button">회원가입</button>
                </form>
            </div>
        </div>
    );
}

function LoginFormPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 폼 제출 처리 로직 추가
        // e.target을 사용하여 폼 데이터에 접근할 수 있음
    };

    return (
        <div>
            <div className="logo">
                <div className="center_logo">
                    <img src={logo_img} alt="로고" className="logo_img" />
                    <div className="logo_ment">당당</div>
                </div>

                <div className="logo_message">
                    <div>로그인하고</div>
                    <div>오늘도 당당하게</div>
                </div>
            </div>

            <div className="login_sign">
                <input type="email" className="id" name="email" placeholder="&emsp; 이메일 주소" />

                <input type="password" className="pw" name="password" placeholder="&emsp; 비밀번호" />
            </div>

            <div className="login_button_container">
                <button type = "submit" className="login_button">로그인</button>
            </div>

            <ul className="id_pw">
                <li><Link to="/searchidpage">아이디 찾기</Link></li>
                <li><a href="#">|</a></li>
                <li><Link to="/searchpwform">비밀번호 재설정</Link></li>
            </ul>
        </div>
    );
}

function SearchIDPage() {
    return (
        <div>
            <div className="sign">아이디 찾기</div>

            <div className="form_box">
                <div className="form">
                    <input type="email" className="email" placeholder="이메일 주소" />
                    <input type="tel" className="telnum" placeholder="핸드폰번호(-없이 입력해주세요)" />
                    <input type="text" className="name" placeholder="이름" />
                </div>
                <button type="submit" className="sign_button">
                    <Link to="/searchidform">아이디 찾기</Link>
                </button>
            </div>
        </div>
    );
}

function SearchIdForm() {
    return (
        <div>
            <div className="search">아이디 찾기</div>

            <div className="form_box">
                <div className="box">홍길동님의 아이디는 <span className="userid">asdf123</span>입니다.</div>

                <button type="submit" className="login_button">로그인하기</button>
                <button type="submit" className="pw_re_button">
                <Link to="/searchpwform">비밀번호 재설정</Link>
                </button>
            </div>
        </div>
    );
}

function SearchPwForm() {
    return (
        <div>
            <div className="sign">비밀번호 재설정</div>

            <div className="form_box">
                <div className="form">
                    <input type="text" className="form_id" placeholder="아이디" />
                    <input type="password" className="pwd" placeholder="비밀번호(8자~12자, 영문+숫자)" />
                    <input type="password" className="pwdchk" placeholder="비밀번호 재입력" />
                </div>
                <button type="submit" className="sign_button1">
                    <Link to="/searchpwform">비밀번호 재설정</Link>
                </button>
                <button type="submit" className="sign_button2">
                <Link to="/loginformpage">로그인하기</Link>
                </button>
            </div>
        </div>
    );
}

function KakaoLoginPage() {
    return (
        <div>
            {/* 카카오 로그인 페이지 내용 */}
            <SocialKakao />
        </div>
    );
}

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />ㄴ
                    <Route path="/signformpage" element={<SignFormPage />} />
                    <Route path="/loginformpage" element={<LoginFormPage />} />
                    <Route path="/searchidpage" element={<SearchIDPage />} />
                    <Route path="/searchidform" element={<SearchIdForm />} />
                    <Route path="/searchpwform" element={<SearchPwForm />} />
                    <Route path="/kakaologin" element={<KakaoLoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;