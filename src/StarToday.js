import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function StarToday() {
    const [bookmarkedDrinks, setBookmarkedDrinks] = useState([]);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [heartColors, setHeartColors] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchBookmarkedDrinks = async () => {
            if (user.isLoggedIn) {
                try {
                    const response = await axios.get('http://localhost:8080/api/drink/bookmark', {
                        headers: {
                            'X-Auth-Username': user.userId,
                            'X-Auth-Authorities': user.authorities
                        }
                    });

                    if (response.data) {
                        setBookmarkedDrinks(response.data);
                        const initialHeartColors = {};
                        response.data.forEach(drink => {
                            initialHeartColors[drink.id] = "#ff0000";
                        });
                        setHeartColors(initialHeartColors);
                    }
                } catch (error) {
                    console.error("Error fetching bookmarked drinks: ", error);
                }
            }
        };

        const fetchTodayDrinks = async () => {
            if (user.isLoggedIn) {
                try {
                    const response = await axios.get('http://localhost:8080/api/drink-record', {
                        headers: {
                            'X-Auth-Username': user.userId,
                            'X-Auth-Authorities': user.authorities
                        }
                    });

                    if (response.data) {
                        setTodayDrinks(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching today's drinks: ", error);
                }
            }
        };

        fetchBookmarkedDrinks();
        fetchTodayDrinks();
    }, [user]);

    async function handleHeartClick(id) {
        const isBookmarked = bookmarkedDrinks.some(drink => drink.id === id);

        try {
            if (isBookmarked) {
                // 북마크 해제
                const response = await axios.delete(`http://localhost:8080/api/bookmark?drinkId=${id}`, {
                    headers: {
                        'X-Auth-Username': user.userId,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    const updatedBookmarkedDrinks = bookmarkedDrinks.filter(drink => drink.id !== id);
                    setBookmarkedDrinks(updatedBookmarkedDrinks);
                    setHeartColors({ ...heartColors, [id]: "#cccccc" });
                } else {
                    console.error("Failed to delete from bookmarks, server responded with a status other than 200");
                }
            } else {
                // 북마크 추가
                const drinkToAdd = todayDrinks.find(drink => drink.drink.id === id);
                if (drinkToAdd) {
                    const response = await axios.post(`http://localhost:8080/api/bookmark?drinkId=${id}`, null, {
                        headers: {
                            'X-Auth-Username': user.userId,
                            'X-Auth-Authorities': user.authorities
                        }
                    });

                    if (response.status === 200) {
                        setBookmarkedDrinks([...bookmarkedDrinks, drinkToAdd.drink]);
                        setHeartColors({ ...heartColors, [id]: "#ff0000" });
                    } else {
                        console.error("Failed to add to bookmarks, server responded with a status other than 200");
                    }
                }
            }
        } catch (error) {
            console.error("Error toggling bookmark: ", error);
        }
    }

    const handleStarClick = async (id) => {
        const drinkToAdd = bookmarkedDrinks.find(drink => drink.id === id);
        if (drinkToAdd) {
            try {
                const response = await axios.post(`http://localhost:8080/api/drink-record?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.userId,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    const addedDrinkRecord = response.data; // 서버에서 반환되는 새롭게 추가된 DrinkRecord의 데이터
                    const fullDrinkInfo = { ...addedDrinkRecord, drink: drinkToAdd };
                    setTodayDrinks([...todayDrinks, fullDrinkInfo]);
                } else {
                    console.error("Failed to add drink to today's drinks, server responded with a status other than 200");
                }
            } catch (error) {
                console.error("Error adding the drink to today's drinks: ", error);
            }
        }
    };

    const handleDeleteClick = async id => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/drink-record?drinkRecordId=${id}`, {
                headers: {
                    'X-Auth-Username': user.userId,
                    'X-Auth-Authorities': user.authorities
                }
            });

            if (response.status === 200) {
                setTodayDrinks(todayDrinks.filter(drink => drink.id !== id));
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
                            <FontAwesomeIcon icon={faHeart} style={{ color: heartColors[bookmarkedDrinks[0]?.id], fontSize: '40px' }} onClick={() => handleHeartClick(bookmarkedDrinks[0]?.id)} />
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
                    <div className="today">
                        <MenuCard
                            imageSrc={todayDrinks[0]?.drink?.imageUrl}
                            brand={todayDrinks[0]?.drink?.cafeName}
                            name={todayDrinks[0]?.drink?.name}
                            sugar={`${todayDrinks[0]?.drink?.sugar}g`}
                            caffeine={`${todayDrinks[0]?.drink?.caffeine}mg`}
                            calorie={`${todayDrinks[0]?.drink?.calorie}kcal`}
                        />
                        <div className="today_right">
                            <FontAwesomeIcon icon={faHeart} style={{ color: getHeartColor(todayDrinks[0]?.drink?.id), fontSize: '40px' }} onClick={() => handleHeartClick(todayDrinks[0]?.drink?.id)} />
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
