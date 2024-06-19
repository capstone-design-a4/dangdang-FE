import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext';

function ComposePage() {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const [buttonTexts, setButtonTexts] = useState({});
    const { user } = useContext(UserContext);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sortCond, setSortCond] = useState('');

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
            let response;
            if (isBookmarked) {
                response = await axios.delete(`http://3.38.119.135:8080/api/bookmark?drinkId=${id}`, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
            } else {
                response = await axios.post(`http://3.38.119.135:8080/api/bookmark?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });
            }
    
            if (response.status === 200) {
                const updatedData = filteredData.map(item =>
                    item.id === id ? { ...item, bookmarked: !isBookmarked } : item
                );
                setFilteredData(updatedData);
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
                const response = await axios.post(`http://3.38.119.135:8080/api/drink-record?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.email,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    setTodayDrinks([...todayDrinks, drinkToAdd]);
                    setButtonTexts(prevTexts => ({
                        ...prevTexts,
                        [id]: '추가됨'
                    }));
                } else {
                    console.error("Failed to add the selected drink to today's drinks.");
                }
            } catch (error) {
                console.error("Error adding the drink to today's drinks: ", error);
            }
        }
    };

    useEffect(() => {
        axios.get('http://3.38.119.135:8080/api/drink/list/컴포즈커피', {
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
                setFilteredData(response.data);
            } else {
                console.error('응답 데이터가 배열이 아닙니다:', response.data);
            }
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류가 발생했습니다!', error);
        });
    }, [sessionAuthorities, sessionEmail]);

    useEffect(() => {
        let newFilteredData = menuData;
        if (searchTerm !== '') {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            newFilteredData = menuData.filter(data =>
                data.name.toLowerCase().includes(lowercasedSearchTerm)
            );
        }

        if (sortCond !== '') {
            newFilteredData = [...newFilteredData].sort((a, b) => a[sortCond] - b[sortCond]);
        }

        setFilteredData(newFilteredData);
        setCurrentPage(1);
        setPageGroup(0);
    }, [searchTerm, sortCond, menuData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startPage = pageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLogoClick = () => {
        setSearchTerm('');
        setCurrentPage(1);
        setPageGroup(0);
    };

    const handleSortClick = (sortCondition) => {
        setSortCond(sortCondition);
    };

    const getColor = (condition) => {
        return sortCond === condition ? '#FFDC00' : 'white';
    }

    return (
        <div>
            <div className="bkcolor_compose">
                <div className="bdbox">
                    <div className="logobox">
                        <img src="compose.png" alt="로고" className="fran_logo" onClick={handleLogoClick} />
                        <div className="bdboxup">컴포즈커피</div>
                    </div>
                    <div className="bdboxdown">
                        <div className="bdsrh">
                            <input
                                type="text"
                                className="bdtext"
                                placeholder="음료 검색하기"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div>
                        <div className="sortbtn">
                            <button 
                                type="button" 
                                className="sugarsort" 
                                style={{ color: getColor('sugar') }} 
                                onClick={() => handleSortClick('sugar')}
                            >
                                당순
                            </button>
                            <div>|</div>
                            <button 
                                type="button" 
                                className="caffeinesort" 
                                style={{ color: getColor('caffeine') }} 
                                onClick={() => handleSortClick('caffeine')}
                            >
                                카페인순
                            </button>
                            <div>|</div>
                            <button 
                                type="button" 
                                className="caloriesort" 
                                style={{ color: getColor('calorie') }} 
                                onClick={() => handleSortClick('calorie')}
                            >
                                칼로리순
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="star_menu">
                {Array.isArray(currentItems) &&
                    currentItems.map((data) => (
                        <div className="first_menu" key={data.id}>
                            <MenuCard
                                imageSrc={data.imageUrl}
                                brand={data.cafeName}
                                name={data.name}
                                sugar={`${data.sugar}g`}
                                calorie={`${data.calorie}kcal`}
                                caffeine={`${data.caffeine}mg`}
                                bookmarked={data.bookmarked}
                            />
                            <div className="menu_right">
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{ color: data.bookmarked ? 'red' : '#D9D9D9', fontSize: '40px', cursor: 'pointer' }} 
                                    onClick={() => handleHeartClick(data.id, data.bookmarked)} 
                                />
                                <button className="today_click" onClick={() => handleButtonClick(data.id)}>{buttonTexts[data.id]}</button>
                            </div>
                        </div>
                    ))
                }
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

export default ComposePage;
