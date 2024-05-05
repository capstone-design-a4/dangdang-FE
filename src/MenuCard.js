import React from 'react';

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
          <span>카페인: {props.caffeine}</span>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
