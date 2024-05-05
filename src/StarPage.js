import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function StarPage() {
    return (
        <div>
            <div className="title">즐겨찾기</div>

            <div className="star_menu">
                <div className="first_menu">
                    <img src="아이스카푸치노.png" alt="아이스카푸치노" className="first_image" />

                    <div className="first_content">
                        <div className="first_brand_menu">
                            <a href="#" className="first_brand">스타벅스</a>
                            <a href="#" className="first_name">아이스 카푸치노</a>
                        </div>

                        <div className="first_detail">
                            <a href="#">9g</a>
                            <a href="#">|</a>
                            <a href="#">118kcal</a>
                        </div>
                    </div>

                    <div className="menu_right">
                        <FontAwesomeIcon icon={ faHeart } style={{ color: '#ff0000', fontSize: '40px' }} />
                        <div className="click">담기</div>
                    </div>
                </div>

                <div className="first_menu">
                    <img src="아이스카푸치노.png" alt="아이스카푸치노" className="first_image" />

                    <div className="first_content">
                        <div className="first_brand_menu">
                            <a href="#" className="first_brand">스타벅스</a>
                            <a href="#" className="first_name">아이스 카푸치노</a>
                        </div>

                        <div className="first_detail">
                            <a href="#">9g</a>
                            <a href="#">|</a>
                            <a href="#">118kcal</a>
                        </div>
                    </div>

                    <div className="menu_right">
                        <FontAwesomeIcon icon={ faHeart } style={{ color: '#ff0000', fontSize: '40px' }} />
                        <div className="click">담기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarPage;
