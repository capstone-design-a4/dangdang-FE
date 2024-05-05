// RecommendedMenu.js

import React from 'react';
import MenuCard from './MenuCard';

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
            caffeine="118mg"
          />
          <MenuCard
            imageSrc="아이스얼그레이티.png"
            brand="스타벅스"
            name="아이스 얼 그레이 티"
            sugar="0g"
            caffeine="0mg"
          />
        </div>
  
        <div className="menu_pair">
          <MenuCard
            imageSrc="우롱티.png"
            brand="공차"
            name="우롱티"
            sugar="0g"
            caffeine="5mg"
          />
          <MenuCard
            imageSrc="페퍼민트.png"
            brand="컴포즈"
            name="페퍼민트"
            sugar="0g"
            caffeine="0.7mg"
          />
        </div>
  
        <div className="last_line"></div>
      </div>
    );
}

export default RecommendedMenu;
