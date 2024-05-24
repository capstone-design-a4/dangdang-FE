import React from 'react';

function MenuCard(props) {
  return (
    <div className="menu_card">
      <div className="menu_image_wrapper">
        <img src={props.imageSrc} alt={props.name} className="menu_image" />
        <div className="menu_detail">
          <span><img src="dang.png" alt="당 이미지" className="dang_card_img" /> {props.sugar} </span>
          <span><img src="caffeine.png" alt="카페인 이미지" className="caf_card_img" />{props.calorie}</span>
          <span><img src="kcal.png" alt="칼로리 이미지" className="kcal_card_img" />{props.caffeine}</span>
        </div>
      </div>
      <div className="menu_info">
        <div className="menu_brand">{props.brand}</div>
        <div className="menu_name">{props.name}</div>
      </div>
    </div>
  );
}

export default MenuCard;
