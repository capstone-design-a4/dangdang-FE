import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';
import UserContext from './UserContext';

function TodayPage() {
    const [drinkRecords, setDrinkRecords] = useState([]);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [heartColors, setHeartColors] = useState({});
    const { user } = useContext(UserContext); // 컨텍스트에서 사용자 정보 가져오기

    useEffect(() => {
        const fetchData = async () => {
            if (user.isLoggedIn) { // 사용자가 로그인 되어 있을 때만 데이터를 가져옵니다.
                try {
                    const result = await axios.get('http://localhost:8080/api/drink-record', {
                        headers: {
                            'accept': '*/*',
                            'X-Auth-Username': user.userId, // 사용자 정보 사용
                            'X-Auth-Authorities': user.authorities // 사용자 권한 정보 사용
                        }
                    });
                    setDrinkRecords(result.data);
                } catch (error) {
                    console.error("Error fetching drink records: ", error);
                }
            }
        };
        fetchData();
    }, [user]); // 'user' 상태가 업데이트 될 때마다 useEffect 실행

    const handleHeartClick = async (id) => {
        try {
            const updatedDrinks = drinkRecords.map((record) => {
                if (record.drink.id === id) {
                    // Toggle the bookmarked status of the drink
                    const updatedDrink = { ...record.drink, bookmarked: !record.drink.bookmarked };
                    const updatedRecord = { ...record, drink: updatedDrink };
    
                    return updatedRecord;
                }
                return record;
            });
    
            // Update the state locally
            setDrinkRecords(updatedDrinks);
    
            // Find the drink that was clicked and add it to today's drinks
            const clickedDrink = updatedDrinks.find((record) => record.drink.id === id);
            if (clickedDrink && clickedDrink.drink.bookmarked) {
                setTodayDrinks([...todayDrinks, clickedDrink]);
            } else {
                // If the drink was unbookmarked, remove it from today's drinks
                setTodayDrinks(todayDrinks.filter((drink) => drink.id !== id));
            }
    
            // Make an API call to update the backend database
            await axios.put(`http://localhost:8080/api/drink-record/${id}`, { bookmarked: clickedDrink.drink.bookmarked });
    
        } catch (error) {
            console.error("Error updating drink record: ", error);
        }
    };
    
    
    
    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/drink-record/${id}`, {
                headers: {
                    accept: '*/*',
                    'X-Auth-Username': user.userId,
                    'X-Auth-Authorities': user.authorities
                }
            });
    
            // Update local state to reflect deletion
            setDrinkRecords(drinkRecords.filter(record => record.drink.id !== id));
    
        } catch (error) {
            console.error("Error deleting drink record: ", error);
        }
    };
    
    return (
        <div>
            <div className="title">오늘 마신 음료</div>
            <div className="star_menu" style={{ minHeight: '123.5px' }}>
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
                                <button className="today_click" onClick={() => todayDrinks.length > 0 && handleDeleteClick(todayDrinks[0].id)}>삭제</button>                            </div>
                        </div>
                    ))
                ) : (
                    <div className="none" style={{ fontSize: '20px', display: 'flex', color: 'grey', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>담긴 음료가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default TodayPage;