import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

const host = window.location.hostname === "localhost"
  ? 'http://3.38.119.135:8080'
  : "/api";

const apiClient = axios.create({
  baseURL: host,
});

function RecommendedMenu() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        apiClient.get('/api/drink/most-bookmarked-list')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('데이터를 불러오는 도중 오류가 발생했습니다!', error);
            });
    }, []);

    return (
        <div className="recommend">
            <div className="first_line"></div>
            <div className="recommend_name">추천메뉴</div>

            <div className="menuGrid">
                {Array.isArray(menuItems) && menuItems.map((item) => (
                    <MenuCard
                        key={item.id}
                        imageSrc={item.imageUrl}
                        brand={item.cafeName}
                        name={item.name}
                        sugar={`${item.sugar}g`}
                        calorie={`${item.calorie}kcal`}
                        caffeine={`${item.caffeine}mg`}
                    />
                ))}
            </div>

            <div className="last_line"></div>
        </div>
    );
}

export default RecommendedMenu;
