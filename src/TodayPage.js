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

function TodayPage() {
    const [drinkRecords, setDrinkRecords] = useState([]);
    const [heartColors, setHeartColors] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            if (user.isLoggedIn) {
                try {
                    const result = await apiClient.get('/api/drink-record', {
                        headers: {
                            'accept': '*/*',
                        }
                    });
                    setDrinkRecords(result.data);

                    const bookmarkResponse = await apiClient.get('/api/drink/bookmark', {
                        headers: {
                            'X-Auth-Username': user.email,
                            'X-Auth-Authorities': user.authorities
                        }
                    });

                    const initialHeartColors = {};
                    result.data.forEach(record => {
                        initialHeartColors[record.drink.id] = bookmarkResponse.data.some(bookmarkedDrink => bookmarkedDrink.id === record.drink.id) ? "#ff0000" : "#cccccc";
                    });
                    setHeartColors(initialHeartColors);
                } catch (error) {
                    console.error("Error fetching drink records: ", error);
                }
            }
        };
        fetchData();
    }, [user]);

    async function handleHeartClick(id) {
        const isBookmarked = heartColors[id] === "#ff0000";

        try {
            if (isBookmarked) {
                // 북마크 해제
                const response = await apiClient.delete(`/api/bookmark?drinkId=${id}`, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    const updatedDrinkRecords = drinkRecords.map(record =>
                        record.drink.id === id ? { ...record, drink: { ...record.drink, bookmarked: false } } : record
                    );
                    setDrinkRecords(updatedDrinkRecords);
                    setHeartColors({ ...heartColors, [id]: "#cccccc" });
                } else {
                    console.error("Failed to delete from bookmarks, server responded with a status other than 200");
                }
            } else {
                // 북마크 추가
                const response = await apiClient.post(`/api/bookmark?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    const updatedDrinkRecords = drinkRecords.map(record =>
                        record.drink.id === id ? { ...record, drink: { ...record.drink, bookmarked: true } } : record
                    );
                    setDrinkRecords(updatedDrinkRecords);
                    setHeartColors({ ...heartColors, [id]: "#ff0000" });
                } else if (response.status === 409) {
                    const updatedDrinkRecords = drinkRecords.map(record =>
                        record.drink.id === id ? { ...record, drink: { ...record.drink, bookmarked: true } } : record
                    );
                    setDrinkRecords(updatedDrinkRecords);
                    setHeartColors({ ...heartColors, [id]: "#ff0000" });
                    console.warn(`Drink with id ${id} is already bookmarked.`);
                } else {
                    console.error("Failed to add to bookmarks, server responded with a status other than 200");
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                const updatedDrinkRecords = drinkRecords.map(record =>
                    record.drink.id === id ? { ...record, drink: { ...record.drink, bookmarked: true } } : record
                );
                setDrinkRecords(updatedDrinkRecords);
                setHeartColors({ ...heartColors, [id]: "#ff0000" });
                console.warn(`Drink with id ${id} is already bookmarked.`);
            } else {
                console.error("Error toggling bookmark: ", error);
            }
        }
    }

    const handleDeleteClick = async (id) => {
        try {
            const response = await apiClient.delete(`/api/drink-record?drinkRecordId=${id}`, {
                headers: {
                    accept: '*/*',
                    'X-Auth-Username': user.email,
                    'X-Auth-Authorities': user.authorities
                }
            });

            if (response.status === 200) {
                setDrinkRecords(drinkRecords.filter(record => record.id !== id));
            } else {
                console.error("Failed to delete the drink record from the API");
            }
        } catch (error) {
            console.error("Error deleting drink record: ", error);
        }
    };

    const getHeartColor = (drinkId) => {
        return heartColors[drinkId] || "#cccccc";
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
                                <FontAwesomeIcon icon={faHeart} style={{ color: getHeartColor(record.drink.id), fontSize: '40px', cursor:'pointer' }} onClick={() => handleHeartClick(record.drink.id)} />
                                <button className="today_click" onClick={() => handleDeleteClick(record.id)}>삭제</button>
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

export default TodayPage;
