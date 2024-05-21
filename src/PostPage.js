import React, { useState } from 'react';

function PostPage() {
    const [title, setTitle] = useState('');
    const [selectedCafe, setSelectedCafe] = useState('선택');
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleCafeSelect = (event) => {
      setSelectedCafe(event.target.value);
      setTitle(`[${event.target.value}] `);
    };
  
    return (
      <div>
        <div className="dangdang_ment">오늘도 당당하게</div>

        <div className="p_title">
          <div className="title_row">
            <div className="title_name">제목</div>
  
            <select className="cafe_select" onChange={handleCafeSelect} value={selectedCafe}>
              <option value="선택">카페선택</option>
              <option value="스타벅스">스타벅스</option>
              <option value="메가커피">메가커피</option>
              <option value="컴포즈커피">컴포즈커피</option>
              <option value="빽다방">빽다방</option>
              <option value="이디야">이디야</option>
              <option value="할리스">할리스</option>
              <option value="더벤티">더벤티</option>
              <option value="공차">공차</option>
              <option value="청자다방">청자다방</option>
              <option value="벌크커피">벌크커피</option>
              <option value="자유">자유</option>
            </select>
          </div>
  
          <input
            type="text"
            className="title_text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={handleTitleChange}
          />
        </div>
  
        <div className="content">
          <div className="content_name">내용</div>
          <input type="text" className="content_text" />
        </div>
  
        <div className="post_button">
          <button type="button" className="back_button">뒤로가기</button>
          <button type="submit" className="submit_button">등록</button>
        </div>
      </div>
    );  
}

export default PostPage;
