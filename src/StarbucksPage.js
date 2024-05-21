import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function StarbucksPage() {
    const [drinks, setDrinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDrinks, setFilteredDrinks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDrinks('스타벅스'); // 초기 렌더링 시 스타벅스 카페의 음료 정보를 가져옵니다.
    }, []);

    useEffect(() => {
        const results = drinks.filter(drink =>
            drink.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDrinks(results);
    }, [searchTerm, drinks]);

    const fetchDrinks = async (cafeName) => {
        try {
            const response = await axios.get(`/api/drink/list/${cafeName}`);
            setDrinks(response.data);
        } catch (error) {
            console.error('Error fetching drinks:', error);
            setErrorMessage('음료를 불러오는 중에 오류가 발생했습니다.');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="bkcolor">
                <div className="bdbox">
                    <div className="bdboxup">스타벅스</div>
                    <div className="bdboxdown">
                        <div className="bdsrh">
                            <input
                                type="text"
                                className="bdtext"
                                placeholder="음료 검색하기"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="star_menu">
                {filteredDrinks.map(drink => (
                    <div className="first_menu" key={drink.id}>
                        <img src={drink.imageUrl} alt={drink.name} className="first_image" />

                        <div className="first_content">
                            <div className="first_brand_menu">
                                <a href="#" className="first_brand">{drink.cafeName}</a>
                                <a href="#" className="first_name">{drink.name}</a>
                            </div>

                            <div className="first_detail">
                                <a href="#">{drink.sugar}g</a>
                                <a href="#">|</a>
                                <a href="#">{drink.calorie}kcal</a>
                            </div>
                        </div>

                        <div className="menu_right">
                            <FontAwesomeIcon icon={ faHeart } style={{ color: '#ff0000', fontSize: '40px' }} />
                            <div className="click">담기</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 오류 발생 모달 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="error_message">{errorMessage}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StarbucksPage;
