import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function StarbucksPage() {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/list/%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4')
            .then(response => {
                setMenuData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <div className="bkcolor">
                <div className="bdbox">
                    <div className="bdboxup">스타벅스</div>
                    <div className="bdboxdown">
                        <div className="bdsrh">
                            <input type="text" className="bdtext" placeholder=" 음료 검색하기" />
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="star_menu">
                {Object.values(menuData).map((item) => (
                    <MenuCard
                        key={item.id}
                        imageSrc={item.imageUrl}
                        brand={item.cafeName}
                        name={item.name}
                        sugar={`${item.sugar}g`}
                        calorie={`${item.calorie}kcal`}
                        caffeine={`${item.caffeine}mg`}
                        bookmarked={item.bookmarked}
                    />
                    
                ))}
            </div>
        </div>
    );
}
export default StarbucksPage;
