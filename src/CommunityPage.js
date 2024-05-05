import React from 'react';
import { Link } from 'react-router-dom';

function CommunityPage() {
    return (
        <div className="community_all">
            <div className="community_top">오늘도 당당하게</div>
            <div className="community_mid">
                <div className="mid_first">
                    <Link to="/postpage">글쓰기</Link>
                </div>
                <ul className="mid_third">
                    <li className="recent_list"><a href="">최신순</a></li>
                    <li> | </li>
                    <li className="recommend_list"><a href="">추천순</a></li>
                </ul>
            </div>
            <div className="community_bottom">
                <div className="board_list_wrap">
                    <div className="board_list">
                        <div className="top">
                            <div className="num">번호</div>
                            <div className="c_title">제목</div>
                            <div className="writer">작성자</div>
                            <div className="count">조회</div>
                            <div className="reco">추천</div>
                        </div>
                        <div>
                            <div className="num">5</div>
                            <div className="c_title"><Link to="/commentpage">글 제목이 들어갑니다.</Link></div>
                            <div className="writer">오영현</div>
                            <div className="count">33</div>
                            <div className="reco">10</div>
                        </div>
                        <div>
                            <div className="num">4</div>
                            <div className="c_title"><a href="#">글 제목이 들어갑니다.</a></div>
                            <div className="writer">오영현</div>
                            <div className="count">33</div>
                            <div className="reco">10</div>
                        </div>
                        <div>
                            <div className="num">3</div>
                            <div className="c_title"><a href="#">글 제목이 들어갑니다.</a></div>
                            <div className="writer">오영현</div>
                            <div className="count">33</div>
                            <div className="reco">10</div>
                        </div>
                        <div>
                            <div className="num">2</div>
                            <div className="c_title"><a href="#">글 제목이 들어갑니다.</a></div>
                            <div className="writer">오영현</div>
                            <div className="count">33</div>
                            <div className="reco">10</div>
                        </div>
                        <div>
                            <div className="num">1</div>
                            <div className="c_title"><a href="#">글 제목이 들어갑니다.</a></div>
                            <div className="writer">오영현</div>
                            <div className="count">33</div>
                            <div className="reco">10</div>
                        </div>
                    </div>
                    <div className="community_board_page">
                        <a href="#" className="bt first">{'<<'}</a>
                        <a href="#" className="bt prev">{'<'}</a>
                        <a href="#" className="num on">1</a>
                        <a href="#" className="num">2</a>
                        <a href="#" className="num">3</a>
                        <a href="#" className="num">4</a>
                        <a href="#" className="num">5</a>
                        <a href="#" className="bt next">{'>'}</a>
                        <a href="#" className="bt last">{'>>'}</a>
                    </div>
                    <div className="community_post_search">
                        <select name="post_sort" className="post_sort">
                            <option value="제목/내용" selected>제목/내용</option>
                            <option value="작성자">작성자</option>
                        </select>
                        <input type="text" className="community_searchtext" placeholder=" 검색어를 입력해주세요" />
                        <button type="submit" className="community_searchbtn">검색</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
