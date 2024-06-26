import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import MenuCard from './MenuCard';
import axios from 'axios';
import UserContext from './UserContext';

const host = window.location.hostname === "localhost"
  ? 'http://3.38.119.135:8080'
  : "/api";

const apiClient = axios.create({
  baseURL: host,
});

function StarPage() {
    const [bookmarkedDrinks, setBookmarkedDrinks] = useState([]);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchBookmarkedDrinks = async () => {
            if (user.isLoggedIn) {
                try {
                    const response = await apiClient.get('/api/drink/bookmark', {
                        headers: {
                            'X-Auth-Username': user.email,
                            'X-Auth-Authorities': user.authorities
                        }
                    });

                    if (response.data) {
                        setBookmarkedDrinks(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching bookmarked drinks: ", error);
                }
            }
        };

        const fetchTodayDrinks = async () => {
            if (user.isLoggedIn) {
                try {
                    const response = await apiClient.get('/api/drink-record', {
                        headers: {
                            'X-Auth-Username': user.email,
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

    const handleHeartClick = async (id) => {
        try {
            await apiClient.delete(`/api/bookmark?drinkId=${id}`, {
                headers: {
                    'X-Auth-Username': user.email,
                    'X-Auth-Authorities': user.authorities
                }
            });

            const updatedBookmarkedDrinks = bookmarkedDrinks.filter(drink => drink.id !== id);
            setBookmarkedDrinks(updatedBookmarkedDrinks);
        } catch (error) {
            console.error("Error deleting the drink from bookmarks: ", error);
        }
    };

    const handleStarClick = async (id) => {
        const drinkToAdd = bookmarkedDrinks.find(drink => drink.id === id);
        if (drinkToAdd) {
            try {
                await apiClient.post(`/api/drink-record?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                setTodayDrinks([...todayDrinks, drinkToAdd]);
            } catch (error) {
                console.error("Error adding the drink to today's drinks: ", error);
            }
        }
    };


    return (
        <div>
            <div className="title">즐겨찾기</div>

            <div className="star_menu" style={{ minHeight: '123.5px' }}>
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
                                <FontAwesomeIcon icon={faHeart} style={{ color: '#ff0000', fontSize: '40px', cursor:'pointer' }} onClick={() => handleHeartClick(bookmarkedDrink.id)} />
                                <button className="star_click" onClick={() => handleStarClick(bookmarkedDrink.id)}>담기</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="none" style={{ fontSize: '20px', display: 'flex', color: 'grey', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>담긴 음료가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default StarPage;