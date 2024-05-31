import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext';

function StarbucksPage() {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const [buttonTexts, setButtonTexts] = useState({});
    const { user } = useContext(UserContext);
    const [todayDrinks, setTodayDrinks] = useState([]);

    const itemsPerPage = 10;
    const pagesPerGroup = 10;

    useEffect(() => {
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userAuthorities', user.authorities);
    }, [user.email, user.authorities]);

    const sessionEmail = sessionStorage.getItem('userEmail');
    const sessionAuthorities = sessionStorage.getItem('userAuthorities');

    const handleHeartClick = async (id, isBookmarked) => {
        try {
            const response = isBookmarked 
                ? await axios.delete(`http://localhost:8080/api/bookmark?drinkId=${id}`, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                })
                : await axios.post(`http://localhost:8080/api/bookmark?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });

            if (response.status === 200) {
                setMenuData(prevMenuData => prevMenuData.map(item => item.id === id ? { ...item, bookmarked: !isBookmarked } : item));
            } else {
                console.error(`Failed to ${isBookmarked ? 'remove from' : 'add to'} bookmarks, server responded with a status other than 200`);
            }
        } catch (error) {
            console.error(`Error toggling bookmark: ${error}`);
        }
    };

    const handleButtonClick = async (id) => {
        const drinkToAdd = menuData.find(item => item.id === id);
    
        if (drinkToAdd) {
            try {
                const response = await axios.post(`http://localhost:8080/api/drink-record?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
    
                if (response.status === 200) {
                    setTodayDrinks([...todayDrinks, drinkToAdd]);
                } else {
                    console.error("Failed to add the selected drink to today's drinks.");
                }
            } catch (error) {
                console.error("Error adding the drink to today's drinks: ", error);
            }
        }
    };
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/list/스타벅스', {
            headers: {
                'X-Auth-Username': sessionEmail,
                'X-Auth-Authorities': sessionAuthorities
            }
        })
        .then(response => {
            console.log('API 응답:', response.data);
            if (Array.isArray(response.data)) {
                setMenuData(response.data);

                const initialButtonTexts = {};
                response.data.forEach(item => {
                    initialButtonTexts[item.id] = '담기';
                });
                setButtonTexts(initialButtonTexts);
            } else {
                console.error('응답 데이터가 배열이 아닙니다:', response.data);
            }
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류가 발생했습니다!', error);
        });
    }, [sessionAuthorities, sessionEmail]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menuData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPageGroup = () => {
        setPageGroup(prev => prev + 1);
        setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
    };

    const handlePreviousPageGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(prev => prev - 1);
            setCurrentPage(pageGroup * pagesPerGroup);
        }
    };

    const totalPages = Math.ceil(menuData.length / itemsPerPage);
    const startPage = pageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    return (
        <div>
            <div className="bkcolor">
                <div className="bdbox">
                    <img src="starbucks.png" alt="로고" className="starbucks_logo" />
                    <div className="bdboxup">스타벅스</div>
                    <div className="bdboxdown">
                         {/* <div className="bdsrh">
                            <input type="text" className="bdtext" placeholder=" 음료 검색하기" />
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="star_menu">
            {Array.isArray(currentItems) &&
                currentItems.map((data) => (
                    <div className="first_menu" key={data.id}>
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
                    <div className="menu_right">
                        <FontAwesomeIcon icon={faHeart} style={{ color: data.bookmarked ? 'red' : '#D9D9D9', fontSize: '40px' }} onClick={() => handleHeartClick(data.id, data.bookmarked)}/>
                        <button className="today_click" onClick={() => handleButtonClick(data.id)}> {buttonTexts[data.id]}</button>
                    </div>
                </div>
                ))}
            </div>

            <div className="pagination">
                {pageGroup > 0 && (
                    <button onClick={handlePreviousPageGroup}>&lt;</button>
                )}
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => handlePageChange(startPage + index)}
                        className={currentPage === startPage + index ? 'active' : ''}
                    >
                        {startPage + index}
                    </button>
                ))}
                {endPage < totalPages && (
                    <button onClick={handleNextPageGroup}>&gt;</button>
                )}
            </div>

        </div>
    );
}

export default StarbucksPage;
