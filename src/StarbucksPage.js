import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function StarbucksPage() {
    const [menuData, setMenuData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
    const itemsPerPage = 10;
    const pagesPerGroup = 10;

    useEffect(() => {
        axios.get('http://localhost:8080/api/drink/list/%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4', {
            headers: {
                'X-Auth-Username': 'user',
                'X-Auth-Authorities': 'USER_ROLE'
            }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setMenuData(response.data);
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
                {Array.isArray(currentItems) && currentItems.map((data) => (
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
