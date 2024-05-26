import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';

function TodayPage() {
    const [drinkRecords, setDrinkRecords] = useState([]);
    const [heartColors, setHeartColors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/drink-record', {
                headers: {
                    'accept': '*/*',
                    'X-Auth-Username': 'user',
                    'X-Auth-Authorities': 'USER_ROLE'
                }
            });
            setDrinkRecords(result.data);
        };
        fetchData();
    }, []);

    const handleHeartClick = (id) => {
        const updatedDrinks = drinkRecords.map(drinkRecord => {
            if (drinkRecord.drink.id === id) {
                return {...drinkRecord, drink: {...drinkRecord.drink, bookmarked: !drinkRecord.drink.bookmarked}};
            }
            return drinkRecord;
        });
        setDrinkRecords(updatedDrinks);
        setHeartColors({...heartColors, [id]: heartColors[id] === "#ffffff" ? "red" : "#ffffff"});
    };

    const handleDeleteClick = (id) => {
        setDrinkRecords(drinkRecords.filter(drinkRecord => drinkRecord.drink.id !== id));
    };

    return (
        <div>
            <div className="title">오늘 마신 음료</div>

            <div className="star_menu" style = {{minHeight:'123.5px'}}>
            {drinkRecords.length > 0 ? (
                    drinkRecords.map((record) => (
                        <div className="first_menu" key={record.id}>
                            <MenuCard
                                imageSrc={record.drink.imageUrl}
                                brand={record.drink.cafeName}
                                name={record.drink.name}
                                sugar={`${record.drink.sugar}g`}
                                caffeine={`${record.drink.caffeine}mg`}
                                calorie={`${record.drink.calorie}kcal`}
                            />
                            <div className="menu_right">
                                <FontAwesomeIcon icon={faHeart} style={{ color: record.drink.bookmarked ? 'red' : '#D9D9D9', fontSize: '40px' }} onClick={() => handleHeartClick(record.drink.id)} />
                                <button className="today_click" onClick={() => handleDeleteClick(record.drink.id)}>삭제</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="none" style={{fontSize:'20px', display: 'flex', color:'grey', justifyContent:'center', alignItems:'center', marginTop:'20px'}}>담긴 음료가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default TodayPage;