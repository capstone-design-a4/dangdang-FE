import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext';

function StarbucksPage() {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    
    // Use an object to store unique button text for each menu item
    const [buttonTexts, setButtonTexts] = useState({});
    const { user } = useContext(UserContext);

    const itemsPerPage = 10;
    const pagesPerGroup = 10;

    const handleHeartClick = async (id, isBookmarked) => {
        try {
            if (isBookmarked) {
                // Remove from bookmarks
                const response = await axios.delete(`http://localhost:8080/api/bookmark?drinkId=${id}`, {
                    headers: {
                        'X-Auth-Username': user.userId,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    setMenuData(prevMenuData => {
                        return prevMenuData.map(item => {
                            if (item.id === id) {
                                return { ...item, bookmarked: false };
                            }
                            return item;
                        });
                    });
                } else {
                    console.error("Failed to remove from bookmarks, server responded with a status other than 200");
                }
            } else {
                // Add to bookmarks
                const response = await axios.post(`http://localhost:8080/api/bookmark?drinkId=${id}`, null, {
                    headers: {
                        'X-Auth-Username': user.userId,
                        'X-Auth-Authorities': user.authorities
                    }
                });

                if (response.status === 200) {
                    setMenuData(prevMenuData => {
                        return prevMenuData.map(item => {
                            if (item.id === id) {
                                return { ...item, bookmarked: true };
                            }
                            return item;
                        });
                    });
                } else if (response.status === 409) {
                    console.warn(`Drink with id ${id} is already bookmarked.`);
                } else {
                    console.error("Failed to add to bookmarks, server responded with a status other than 200");
                }
            }
        } catch (error) {
            console.error("Error toggling bookmark: ", error);
        }
    };

    const handleDeleteClick = (id) => {
        // Add your logic for handling delete click here
        console.log('Delete button clicked for id:', id);
    };

    const handleButtonClick = (id) => {
        setButtonTexts(prevState => {
            const newButtonTexts = { ...prevState };
            newButtonTexts[id] = newButtonTexts[id] === '담기' ? '삭제' : '담기';
            return newButtonTexts;
        });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/list/스타벅스', {
            headers: {
                'X-Auth-Username': user.userId,
                'X-Auth-Authorities': user.authorities
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setMenuData(response.data);
                
                // Initialize button texts with default values for each menu item
                const initialButtonTexts = {};
                response.data.forEach(item => {
                    initialButtonTexts[item.id] = '담기';
                });
                setButtonTexts(initialButtonTexts);
            } else {
                console.error('The response data is not an array:', response.data);
            }
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
    }, []);

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
                                key={data.id} // Add key prop here
                                imageSrc={data.imageUrl}
                                brand={data.cafeName}
                                name={data.name}
                                sugar={`${data.sugar}g`}
                                calorie={`${data.calorie}kcal`}
                                caffeine={`${data.caffeine}mg`}
                                bookmarked={data.bookmarked}
                            />
                        <div className="menu_right">
                            <FontAwesomeIcon icon={faHeart} style={{ color: data.bookmarked ? 'red' : '#D9D9D9', fontSize: '40px' }} onClick={() => handleHeartClick(data.id)}/>
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