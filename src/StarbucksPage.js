import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function StarbucksPage() {
    return (
        <div>
            <div className="bkcolor">
                <div className="bdbox">
                    <div className="bdboxup">스타벅스</div>
                    <div className="bdboxdown">
                        <div className="bdsrh">
                            <input type="text" className="bdtext" placeholder=" 음료 검색하기" />
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="star_menu">
                <div className="first_menu">
                    <img src="ice_cappuccino.png" alt="아이스커피" className="first_image" />
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
                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                        <div className="click">담기</div>
                    </div>
                </div>
                <div className="first_menu">
                    <img src="ice_cappuccino.png" alt="아이스커피" className="first_image" />
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
                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                        <div className="click">담기</div>
                    </div>
                </div>
                <div className="first_menu">
                    <img src="ice_cappuccino.png" alt="아이스커피" className="first_image" />
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
                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                        <div className="click">담기</div>
                    </div>
                </div>
                <div className="first_menu">
                    <img src="ice_cappuccino.png" alt="아이스커피" className="first_image" />
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
                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                        <div className="click">담기</div>
                    </div>
                </div>
                <div className="first_menu">
                    <img src="ice_cappuccino.png" alt="아이스커피" className="first_image" />
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
                        <i className="fa-solid fa-heart" style={{ color: '#ff0000' }}></i>
                        <div className="click">담기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StarbucksPage;