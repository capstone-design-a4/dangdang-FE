import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './login.css';
import './sign.css';
import './sign_form.css';
import './login_form.css';
import './searchid_form.css';
import './searchpw_form.css';
import './modal.css';
import './homepage.css';
import './brand.css';
import SocialKakao from './kakaologin';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Navbar({ isLoggedIn, name, onLogout }) {
    return (
        <div className="nav">
            <div className="nav_logo">
                <img src="당당이.png" alt="로고" className="logo_img" />
                <Link to="/homepage" style={{ fontWeight: "bold" }}>당당</Link>
            </div>
            <ul className="nav_menu">
                <li><Link to="/homepage" className="home">홈</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
                <li><Link to="/community">커뮤니티</Link></li>
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
                        <li><Link to="/login">로그인</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/sign">회원가입</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}

function Logo({ message }) {
    return (
        <div className="logo">
            <div className="center_logo">
                <img src="당당이.png" alt="로고" className="logo_img" />
                <div className="logo_ment" style={{ fontWeight: "bold" }}>당당</div>
            </div>
            <div className="logo_message">
                <div>{message}</div>
                <div>오늘도 당당하게</div>
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


function SignUpPage() {
    return (
        <div>
            <Logo message="회원가입하고" />
            <SignUp />
            <Question />
        </div>
    );
}

function LoginPage({ onLogin }) {
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

    // 모달 닫기 함수
    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const params = {
                loginId: e.target.email.value,
                password: e.target.password.value,
            };
            console.log(params);
            const response = await axios.post('http://localhost:8080/login', {}, { params });
    
            console.log(response);
            if (response.status === 200) {
                // 로그인 성공
                onLogin(e.target.email.value); // 사용자 이름을 전달
                window.location.href = '/homepage'; // 로그인 후 이동할 페이지
            } else {
                // 로그인 실패
                setErrorMessage(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('로그인 중 오류가 발생했습니다.');
            setShowModal(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="logo">
                    <div className="center_logo">
                        <img src="당당이.png" alt="로고" className="logo_img" />
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
                    <button type="submit" className="login_button">로그인</button>
                </div>
                
                <div className="id_pw">
                    <ul>
                        <li><Link to="/searchidpage">아이디 찾기</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/searchpwform">비밀번호 재설정</Link></li>
                    </ul>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                    </div>
                </div>
            )}
        </form>
    );
}

function NotFoundPage() {
    return <div>404 Not Found</div>;
}

function SignFormPage() {
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false); // 회원가입 성공 여부 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태
    const [errorMessage, setErrorMessage] = useState(''); // 회원가입 실패 시 오류 메시지 상태

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const joinData = {
                loginId: e.target.email.value,
                email: e.target.email.value,
                password: e.target.password.value,
                passwordCheck: e.target.password.value,
                name: e.target.name.value,
                gender: e.target.gender.value,
                phoneNumber: e.target.phonenumber.value
            };
  
            const response = await axios.post('http://localhost:8080/join', joinData);

            console.log(response.data); // 회원가입 성공 메시지 출력

            // 회원가입 성공 시
            setIsSignUpSuccess(true);

        } catch (error) {
            // 에러 처리
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrorMessage(error.response.data.message); // 서버에서 반환된 오류 메시지 설정
            } else if (error.request) {
                console.error('No response received:', error.request);
                setErrorMessage('서버로부터 응답이 없습니다.');
            } else {
                console.error('Error setting up the request:', error.message);
                setErrorMessage('요청 설정 중 오류가 발생했습니다.');
            }

            // 회원가입 실패 시 모달 표시
            setShowModal(true);
        }
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
                            <option value="MALE">남자</option>
                            <option value="FEMALE">여자</option>
                        </select>
                    </div>
                    <button type="submit" className="sign_button">회원가입</button>
                </form>
            </div>

            {/* 회원가입 실패 모달 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                        <div className="retry_message">다시 시도해주세요.</div>
                    </div>
                </div>
            )}

            {/* 회원가입 성공 모달 */}
            {isSignUpSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsSignUpSuccess(false)}>&times;</span>
                        <div className="success_message">회원가입을 성공하였습니다.</div>
                        {/* 로그인하러 가기 버튼 추가 */}
                        <button className="modal_login_button" onClick={() => window.location.href = '/loginformpage'}>로그인하러 가기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function LoginFormPage() {
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

    // 모달 닫기 함수
    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = {
                loginId: e.target.email.value,
                password: e.target.password.value,
            };
            console.log(params);
            const response = await axios.post('http://localhost:8080/login', {}, { params });
    
            console.log(response);
            if (response.status === 200) {
                // 로그인 성공
                window.location.href = ''; // 로그인 후 이동할 페이지
            } else {
                // 로그인 실패
                setErrorMessage(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('로그인 중 오류가 발생했습니다.');
            setShowModal(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="logo">
                    <div className="center_logo">
                        <img src="당당이.png" alt="로고" className="logo_img" />
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
                    <button type="submit" className="login_button">로그인</button>
                </div>
                
                <div className="id_pw">
                    <ul>
                        <li><Link to="/searchidpage">아이디 찾기</Link></li>
                        <li><a href="#">|</a></li>
                        <li><Link to="/searchpwform">비밀번호 재설정</Link></li>
                    </ul>
                </div>
            </div>

            {/* 모달 표시 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                    </div>
                </div>
            )}
        </form>
    );
}

function SearchIDPage() {
    const [phoneNumber, setPhoneNumber] = useState(''); // 핸드폰 번호를 위한 상태
    const [name, setName] = useState(''); // 이름을 위한 상태
    const [foundId, setFoundId] = useState(''); // 찾은 아이디를 위한 상태

    // 아이디 찾기 함수
    const handleSearchId = async () => {
        try {
            // API를 호출하여 아이디를 찾음
            const response = await axios.post('http://localhost:8080/findId', { phoneNumber, name });
            const foundId = response.data.id; // 찾은 아이디

            // 찾은 아이디를 상태에 저장
            setFoundId(foundId);
        } catch (error) {
            console.error('Error searching for ID:', error);
        }
    };

    return (
        <div>
            <div className="sign">아이디 찾기</div>

            <div className="form_box">
                <div className="form">
                    <input
                        type="tel"
                        className="telnum"
                        placeholder="핸드폰번호(-없이 입력해주세요)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        className="name"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="button" className="searchid_button" onClick={handleSearchId}>
                    아이디 찾기
                </button>

                <button type = "button" className="login_button">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>

            </div>

            {/* 아이디가 찾아진 경우에만 표시 */}
            {foundId && <SearchIdForm userId={foundId} />}
        </div>
    );
}

// SearchIdForm에서 아이디를 받아와서 표시
function SearchIdForm({ userId }) {
    return (
        <div>
            <div className="search">아이디 찾기</div>

            <div className="form_box">
                <div className="box">홍길동님의 아이디는 <span className="userid">{userId}</span>입니다.</div>

                {/* 로그인 또는 비밀번호 재설정 페이지로 이동할 수 있는 버튼 추가 */}
                <button type="button" className="login_button">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>
                <button type="button" className="pw_re_button">
                    <Link to="/searchpwform">비밀번호 재설정</Link>
                </button>
            </div>
        </div>
    );
}

function Modal({ children, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

function SearchPwForm() {
    const [passwordReset, setPasswordReset] = useState(false); // 비밀번호 재설정 여부를 나타내는 상태
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 나타내는 상태

    const handlePasswordReset = () => {
        // 비밀번호 재설정 로직을 수행한 후에 호출되는 함수
        // 여기서는 단순히 setPasswordReset(true)를 호출하여 재설정되었음을 표시
        setPasswordReset(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="sign">비밀번호 재설정</div>

            <div className="form_box">
                <div className="form">
                    <input type="text" className="form_id" placeholder="아이디" />
                    <input type="password" className="pwd" placeholder="비밀번호(8자~12자, 영문+숫자)" />
                    <input type="password" className="pwdchk" placeholder="비밀번호 재입력" />
                </div>
                <button type="submit" className="sign_button1" onClick={handlePasswordReset}>
                    비밀번호 재설정
                </button>
                <button type="submit" className="sign_button2">
                    <Link to="/loginformpage">로그인하기</Link>
                </button>
            </div>

            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <div>비밀번호가 재설정되었습니다.</div>
                </Modal>
            )}
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

function HomePage() {
    return (
      <div className="App">
        <div className="container">
          <div className="hello_box">
            <div className="date">3월 25일 목표!</div>
            <img src="당당이.png" alt="로고" className="hello_logo" />
            <div className="hello_user">
              <div className="hello_dang">0g</div>
              <div className="hello_ment">로그인 후 이용가능합니다.</div>
            </div>
  
            <div className="hello_inbox">
              <div className="hello_inbox_dang">
                <div className="inbox_dang_ment">당 섭취량</div>
                <a href="#" className="inbox_dang">0g</a>
              </div>
  
              <div className="inbox_line"><a href="#">|</a></div>
  
              <div className="hello_inbox_kcal">
                <div className="inbox_kcal_ment">먹은 칼로리</div>
                <a href="#" className="inbox_kcal">0kcal</a>
              </div>
            </div>
            <button onClick={() => { window.location.href = '/login' }} className="login_sign_btn">로그인 | 회원가입</button>
          </div>
          <RecommendedMenu />
        </div>
  
        <div className="bbrand">
          <div className="bbrand_ment_plus">
            <div className="bbrand_ment">당당의 인기 프랜차이즈</div>
            <Link to="/brandpage" className="brand_plus">더보기</Link>
          </div>
  
          <div className="bbrand_top5">
            <a href="#"><img src="스타벅스로고.png" alt="스타벅스 로고" /></a>
            <a href="#"><img src="메가로고.png" alt="메가 로고" /></a>
            <a href="#"><img src="컴포즈로고.png" alt="컴포즈 로고" /></a>
            <a href="#"><img src="빽다방로고.png" alt="빽다방 로고" /></a>
            <a href="#"><img src="이디야로고.png" alt="이디야 로고" /></a>
          </div>
        </div>
      </div>
    );
  }
  
  function RecommendedMenu() {
    return (
      <div className="recommend">
        <div className="first_line"></div>
        <div className="recommend_name">추천메뉴</div>
  
        <div className="menu_pair">
          <MenuCard
            imageSrc="아이스카푸치노.png"
            brand="스타벅스"
            name="아이스 카푸치노"
            sugar="9g"
            calorie="118kcal"
          />
          <MenuCard
            imageSrc="아이스얼그레이티.png"
            brand="스타벅스"
            name="아이스 얼 그레이 티"
            sugar="0g"
            calorie="0kcal"
          />
        </div>
  
        <div className="menu_pair">
          <MenuCard
            imageSrc="우롱티.png"
            brand="스타벅스"
            name="우롱티"
            sugar="0g"
            calorie="5kcal"
          />
          <MenuCard
            imageSrc="페퍼민트.png"
            brand="컴포즈"
            name="페퍼민트"
            sugar="0g"
            calorie="0.7kcal"
          />
        </div>
  
        <div className="last_line"></div>
      </div>
    );
  }
  
  function MenuCard(props) {
    return (
      <div className="menu_card">
        <div className="menu_image_wrapper">
          <img src={props.imageSrc} alt={props.name} className="menu_image" />
        </div>
        <div className="menu_info">
          <div className="menu_brand">{props.brand}</div>
          <div className="menu_name">{props.name}</div>
          <div className="menu_detail">
            <span>당: {props.sugar}</span>
            <span>|</span>
            <span>칼로리: {props.calorie}</span>
          </div>
        </div>
      </div>
    );
  }

  function BrandPage() {
    return (
      <div>
        <div className="brand_ment">당당의 인기 프랜차이즈</div>
  
        <div className="brand">
          <a href="#"><img src="스타벅스로고.png" alt="스타벅스 로고" /></a>
          <a href="#"><img src="메가로고.png" alt="메가 로고" /></a>
          <a href="#"><img src="컴포즈로고.png" alt="컴포즈 로고" /></a>
          <a href="#"><img src="빽다방로고.png" alt="빽다방 로고" /></a>
          <a href="#"><img src="이디야로고.png" alt="이디야 로고" /></a>
          <a href="#"><img src="투썸로고.png" alt="투썸 로고" /></a>
          <a href="#"><img src="엔젤로고.png" alt="엔젤리너스 로고" /></a>
          <a href="#"><img src="공차로고.png" alt="공차 로고" /></a>
          <a href="#"><img src="청자로고.png" alt="청자다방 로고" /></a>
          <a href="#"><img src="벌크로고.png" alt="벌크 로고" /></a>
        </div>
      </div>
    );
  }

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 나타내는 상태
    const [name, setUserName] = useState(''); // 로그인한 사용자 이름을 나타내는 상태

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn);
        console.log("userName:", name);
    }, [isLoggedIn, name]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };    

    const handleLogin = async (name, password) => {
        console.log('Login attempt:', name);
        try {
            const response = await axios.post('http://localhost:8080/login', { name, password });
            console.log('Login response:', response);
            if (response.status === 200 && response.data) {
                if (response.data.success) {
                    setIsLoggedIn(true);
                    setUserName(name);
                } else {
                    console.log('Login failed:', response.data.message);
                }
            } else {
                console.log('Login failed: Unexpected response');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    
    return (
        <Router>
            <div>
                <Navbar isLoggedIn={isLoggedIn} name={name} onLogout={handleLogout} />
                <Routes>
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/sign" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signformpage" element={<SignFormPage />} />
                    <Route path="/loginformpage" element={<LoginFormPage />} />
                    <Route path="/searchidpage" element={<SearchIDPage />} />
                    <Route path="/searchidform" element={<SearchIdForm />} />
                    <Route path="/searchpwform" element={<SearchPwForm />} />
                    <Route path="/kakaologin" element={<KakaoLoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/brandpage" element={<BrandPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;