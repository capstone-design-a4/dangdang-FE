import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function StarbucksPage() {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/list/%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4', {
            headers: {
                'X-Auth-Username': 'user',
                'X-Auth-Authorities': 'USER_ROLE'
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setMenuData(response.data);
            } else {
                console.error('The response data is not an array:', response.data);
            }
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
                {Array.isArray(menuData) && menuData.map((data) => (
                    <MenuCard
                        key={data.id}
                        imageSrc={data.imageUrl}
                        brand={data.cafeName}
                        name={data.name}
                        sugar={`${data.sugar}g`}
                        calorie={`${data.calorie}kcal`}
                        caffeine={`${data.caffeine}mg`}
                        bookmarked={data.bookmarked}
                    />
                ))}
            </div>
        </div>
    );
}

export default StarbucksPage;
