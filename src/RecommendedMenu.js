import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

function RecommendedMenu() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/most-bookmarked-list')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="recommend">
            <div className="first_line"></div>
            <div className="recommend_name">추천메뉴</div>

            <div className="menuGrid">
                {menuItems.map((item) => (
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