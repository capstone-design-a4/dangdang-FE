import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext';

function BaekPage() {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const [buttonTexts, setButtonTexts] = useState({});
    const { user } = useContext(UserContext);
    const [todayDrinks, setTodayDrinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const itemsPerPage = 10;
    const pagesPerGroup = 10;

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
        axios.get('http://localhost:8080/api/drink/list/빽다방', {
            headers: {
                'X-Auth-Username': user.email,
                'X-Auth-Authorities': user.authorities
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setMenuData(response.data);

                const initialButtonTexts = {};
                response.data.forEach(item => {
                    initialButtonTexts[item.id] = '담기';
                });
                setButtonTexts(initialButtonTexts);
                setFilteredData(response.data);
            } else {
                console.error('The response data is not an array:', response.data);
            }
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, [user.authorities, user.email]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredData(menuData);
        } else {
            setFilteredData(menuData.filter(data =>
                data.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
        setCurrentPage(1);
        setPageGroup(0);
    }, [searchTerm, menuData]);

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

    return (
        <div>
            <div className="bkcolor_baek">
                <div className="bdbox">
                    <div className="logobox">
                        <img src="baek.png" alt="로고" className="baek_logo" onClick={handleLogoClick} />
                        <div className="bdboxup">빽다방</div>
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
                        <FontAwesomeIcon icon={faHeart} style={{ color: data.bookmarked ? 'red' : '#D9D9D9', fontSize: '40px', cursor:'pointer' }} onClick={() => handleHeartClick(data.id, data.bookmarked)}/>
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

export default BaekPage;
