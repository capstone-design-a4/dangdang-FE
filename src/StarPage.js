import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';

function StarPage() {
    const [bookmarkedDrinks, setBookmarkedDrinks] = useState([]);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [heartColors, setHeartColors] = useState({});

    useEffect(() => {
        const fetchBookmarkedDrinks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/drink/bookmark', {
                    headers: {
                        'X-Auth-Username': 'user',
                        'X-Auth-Authorities': 'USER_ROLE'
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
        };

        const fetchTodayDrinks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/drink-record', {
                    headers: {
                        'X-Auth-Username': 'user',
                        'X-Auth-Authorities': 'USER_ROLE'
                    }
                });

                if (response.data) {
                    setTodayDrinks(response.data);
                }
            } catch (error) {
                console.error("Error fetching today's drinks: ", error);
            }
        };

        fetchBookmarkedDrinks();
        fetchTodayDrinks();
    }, []);

    const handleHeartClick = (id) => {
        setBookmarkedDrinks(bookmarkedDrinks.filter(drink => drink.id !== id));
        setHeartColors({...heartColors, [id]: "#ffffff"});
    };

    const handleDeleteClick = (id) => {
        setTodayDrinks(todayDrinks.filter(drink => drink.id !== id));
    };

    return (
        <div>
            <div className="title">즐겨찾기</div>

            <div className="star_menu" style = {{minHeight:'123.5px'}}>
            {bookmarkedDrinks.length > 0 ? (
                    bookmarkedDrinks.map((bookmarkedDrink) => (
                        <div className="first_menu" key={bookmarkedDrink.id}>
                            <MenuCard
                                imageSrc={bookmarkedDrink.imageUrl}
                                brand={bookmarkedDrink.cafeName}
                                name={bookmarkedDrink.name}
                                sugar={`${bookmarkedDrink.sugar}g`}
                                caffeine={`${bookmarkedDrink.caffeine}mg`}
                                calorie={`${bookmarkedDrink.calorie}kcal`}
                            />
                            <div className="menu_right">
                                <FontAwesomeIcon icon={faHeart} style={{ color: heartColors[bookmarkedDrink.id], fontSize: '40px' }} onClick={() => handleHeartClick(bookmarkedDrink.id)} />
                                <button className="star_click">담기</button>
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

export default StarPage;