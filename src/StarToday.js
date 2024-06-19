import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

axios.defaults.withCredentials = true;

const host = window.location.hostname === "localhost"
  ? 'http://3.38.119.135:8080'
  : "/api";

const apiClient = axios.create({
  baseURL: host,
});

function StarToday() {
    const [bookmarkedDrinks, setBookmarkedDrinks] = useState([]);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [heartColors, setHeartColors] = useState({});
    const { setDailyStats } = useContext(UserContext);

    useEffect(() => {
        const fetchBookmarkedDrinks = async () => {
            try {
                const response = await apiClient.get('/api/drink/bookmark');
                console.log("bookmarkedDrinks response:", response.data);
                if (Array.isArray(response.data)) {
                    setBookmarkedDrinks(response.data);
                    const initialHeartColors = {};
                    response.data.forEach(drink => {
                        initialHeartColors[drink.id] = "#ff0000";
                    });
                    setHeartColors(initialHeartColors);
                } else {
                    console.error("Bookmarked drinks data is not an array");
                }
            } catch (error) {
                console.error("Error fetching bookmarked drinks: ", error);
            }
        };

        const fetchTodayDrinks = async () => {
            try {
                const response = await apiClient.get('/api/drink-record');
                console.log("todayDrinks response:", response.data);
                if (Array.isArray(response.data)) {
                    setTodayDrinks(response.data);
                } else {
                    console.error("Today's drinks data is not an array");
                }
            } catch (error) {
                console.error("Error fetching today's drinks: ", error);
            }
        };

        fetchBookmarkedDrinks();
        fetchTodayDrinks();
    }, []);

    async function handleHeartClick(drinkId, isBookmarked) {
        try {
            if (isBookmarked) {
                // 음료가 북마크 되어 있는 경우, 삭제 요청
                await apiClient.delete(`/api/bookmark?drinkId=${drinkId}`);
                setBookmarkedDrinks(bookmarkedDrinks.filter(drink => drink.id !== drinkId));
                setHeartColors({ ...heartColors, [drinkId]: "#cccccc" });
            } else {
                // 음료가 북마크 되어 있지 않은 경우, 추가 요청
                await apiClient.post(`/api/bookmark?drinkId=${drinkId}`);
                const drinkToAdd = todayDrinks.find(record => record.drink.id === drinkId)?.drink;
                if (drinkToAdd) {
                    setBookmarkedDrinks([...bookmarkedDrinks, drinkToAdd]);
                    setHeartColors({ ...heartColors, [drinkId]: "#ff0000" });
                }
            }
        } catch (error) {
            console.error("Error toggling bookmark: ", error);
        }
    }

    const handleStarClick = async (drinkId) => {
        try {
            const response = await apiClient.post(`/api/drink-record?drinkId=${drinkId}`);
            if (response.status === 200) {
                const response2 = await apiClient.get('/api/drink-record');
                setTodayDrinks(response2.data);

                const response3 = await apiClient.get('/api/record/day');
                const { sugarIntake, calorieIntake, caffeineIntake } = response3.data.dayStat;
                setDailyStats({ sugarIntake, calorieIntake, caffeineIntake });
            } else {
                console.error("Failed to add drink to today's drinks, server responded with a status other than 200");
            }
        } catch (error) {
            console.error("Error adding the drink to today's drinks: ", error);
        }
    };

    const handleDeleteClick = async (drinkRecordId) => {
        try {
            const response = await apiClient.delete(`/api/drink-record?drinkRecordId=${drinkRecordId}`);
            if (response.status === 200) {
                setTodayDrinks(todayDrinks.filter(drink => drink.id !== drinkRecordId));

                const response2 = await apiClient.get('/api/record/day');
                const { sugarIntake, calorieIntake, caffeineIntake } = response2.data.dayStat;
                setDailyStats({ sugarIntake, calorieIntake, caffeineIntake });
            } else {
                console.error("Failed to delete the drink record from the API");
            }
        } catch (error) {
            console.error("Error deleting drink record: ", error);
        }
    };

    const getHeartColor = (drinkId) => {
        return bookmarkedDrinks.some(drink => drink.id === drinkId) ? "#ff0000" : "#cccccc";
    };

    return (
        <div className="star_today">
            <div className="first_line"></div>
            <div className="star_name_plus">
                <div className="star_name">즐겨찾기</div>
                <Link to="/starpage" className="star_plus">더보기</Link>
            </div>

            <div className="star_container" style={{ minHeight: '123.5px' }}>
                {bookmarkedDrinks.length > 0 ? (
                    <div className="star" key={bookmarkedDrinks[0].id}>
                        <MenuCard
                            imageSrc={bookmarkedDrinks[0]?.imageUrl}
                            brand={bookmarkedDrinks[0]?.cafeName}
                            name={bookmarkedDrinks[0]?.name}
                            sugar={`${bookmarkedDrinks[0]?.sugar}g`}
                            caffeine={`${bookmarkedDrinks[0]?.caffeine}mg`}
                            calorie={`${bookmarkedDrinks[0]?.calorie}kcal`}
                        />
                        <div className="star_right">
                            <FontAwesomeIcon icon={faHeart} style={{ color: getHeartColor(bookmarkedDrinks[0]?.id), fontSize: '40px', cursor:'pointer' }} onClick={() => handleHeartClick(bookmarkedDrinks[0]?.id, true)} />
                            <button className="star_click" onClick={() => handleStarClick(bookmarkedDrinks[0]?.id)}>담기</button>
                        </div>
                    </div>
                ) : (
                    <div className="none" style={{ fontSize: '15px', display: 'flex', color: 'grey', justifyContent: 'center', alignItems: 'center' }}>담긴 음료가 없습니다.</div>
                )}
            </div>

            <div className="today_name_plus">
                <div className="today_name">오늘 마신 음료</div>
                <Link to="/todaypage" className="today_plus">더보기</Link>
            </div>

            <div className="today_container" style={{ minHeight: '123.5px' }}>
                {todayDrinks.length > 0 ? (
                    <div className="today" key={todayDrinks[0].id}>
                        <MenuCard
                            imageSrc={todayDrinks[0]?.drink?.imageUrl}
                            brand={todayDrinks[0]?.drink?.cafeName}
                            name={todayDrinks[0]?.drink?.name}
                            sugar={`${todayDrinks[0]?.drink?.sugar}g`}
                            caffeine={`${todayDrinks[0]?.drink?.caffeine}mg`}
                            calorie={`${todayDrinks[0]?.drink?.calorie}kcal`}
                        />
                        <div className="today_right">
                            <FontAwesomeIcon icon={faHeart} style={{ color: getHeartColor(todayDrinks[0]?.drink?.id), fontSize: '40px', cursor:'pointer' }} onClick={() => handleHeartClick(todayDrinks[0]?.drink?.id, getHeartColor(todayDrinks[0]?.drink?.id) === "#ff0000")} />

                            <button className="today_click" onClick={() => handleDeleteClick(todayDrinks[0]?.id)}>삭제</button>
                        </div>
                    </div>
                ) : (
                    <div className="none" style={{ fontSize: '15px', display: 'flex', color: 'grey', justifyContent: 'center', alignItems: 'center' }}>담긴 음료가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default StarToday;
