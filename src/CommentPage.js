import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function CommentPage() {
    return (
        <div>
            <div className="comment">
                <div className="comment_top">
                    <div className="post_title">
                        <h3 className="post_title1">[스타벅스]</h3>
                        <h3 className="post_title2">이거 정말 맛있어요!</h3>
                    </div>

                    <div className="Info">
                        <dl>
                            <dt>작성자</dt>
                            <dd>박성빈</dd>
                        </dl>
                        <div className="Info2">
                            <dl>
                                <dt>날짜</dt>
                                <dd>2024.03.24</dd>
                            </dl>
                            <dl>
                                <dt>조회수</dt>
                                <dd>3회</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="writing">
                        떠나는 길에 네가 내게 말했지<br />
                        너는 바라는 게 너무나 많아<br />
                        잠깐이라도 널 안 바라보면<br />
                        머리에 불이 나버린다니까<br />
                        나는 흐르려는 눈물을 참고<br />
                        하려던 얘길 어렵게 누르고<br />
                        그래, 미안해라는 한 마디로<br />
                        너랑 나눈 날들 마무리했었지<br />
                        달디달고, 달디달고, 달디단, 밤양갱, 밤양갱<br />
                        내가 먹고 싶었던 건, 달디단, 밤양갱, 밤양갱이야<br />
                    </div>
                    <div className="btn_view">
                        <a href="#">수정</a>
                    </div>

                    <div className="reco_box">
                        <div className="btn_reco">
                            <a href="#"><FontAwesomeIcon icon={faThumbsUp} /></a>
                            <div className="reco_cnt">추천 2</div>
                        </div>
                    </div>
                </div>

                <div className="comment_mid">
                    <div className="comment_cnt">댓글 23개</div>
                    <div className="comment1">
                        <div className="user">
                            <div className="user_name">조계현</div>
                            <div className="comment_date">2024.03.24 19:36</div>
                        </div>
                        <div className="write">저도 나중에 먹어보고 싶어요!</div>
                    </div>
                    <div className="comment2">
                        <div className="user">
                            <div className="user_name">조계현</div>
                            <div className="comment_date">2024.03.24 19:36</div>
                        </div>
                        <div className="write">저도 나중에 먹어보고 싶어요!</div>
                    </div>
                    <div className="comment3">
                        <div className="user">
                            <div className="user_name">조계현</div>
                            <div className="comment_date">2024.03.24 19:36</div>
                        </div>
                        <div className="write">저도 나중에 먹어보고 싶어요!</div>
                    </div>
                </div>

                <div className="comment_bottom">
                    <div className="comment_page">
                        <a href="#" className="bt first">&lt;&lt;</a>
                        <a href="#" className="bt prev">&lt;</a>
                        <a href="#" className="num on">1</a>
                        <a href="#" className="num">2</a>
                        <a href="#" className="num">3</a>
                        <a href="#" className="num">4</a>
                        <a href="#" className="num">5</a>
                        <a href="#" className="bt next">&gt;</a>
                        <a href="#" className="bt last">&gt;&gt;</a>
                    </div>

                    <div className="post_search">
                        <select name="post_sort" className="post_sort">
                            <option value="제목/내용 selected">제목/내용</option>
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

export default CommentPage;
