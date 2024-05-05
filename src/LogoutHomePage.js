import React from 'react';
import { Link } from 'react-router-dom';
import RecommendedMenu from './RecommendedMenu';

function LogoutHomePage() {
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
  
              <div className="hello_inbox_caf">
                <div className="inbox_caf_ment">카페인 섭취량</div>
                <a href="#" className="inbox_caf">0mg</a>
              </div>
            </div>
            <button onClick={() => { window.location.href = '/loginpage' }} className="login_sign_btn">로그인 | 회원가입</button>
          </div>
          <RecommendedMenu />
        </div>
  
        <div className="bbrand">
          <div className="bbrand_ment_plus">
            <div className="bbrand_ment">당당의 인기 프랜차이즈</div>
            <Link to="/brandpage" className="bbrand_plus">더보기</Link>
          </div>
  
          <div className="bbrand_top5">
            <Link to="/starbuckspage"><img src="스타벅스로고.png" alt="스타벅스 로고" /></Link>
            <a href="#"><img src="메가로고.png" alt="메가 로고" /></a>
            <a href="#"><img src="컴포즈로고.png" alt="컴포즈 로고" /></a>
            <a href="#"><img src="빽다방로고.png" alt="빽다방 로고" /></a>
            <a href="#"><img src="이디야로고.png" alt="이디야 로고" /></a>
          </div>
        </div>
      </div>
    );
}

export default LogoutHomePage;
