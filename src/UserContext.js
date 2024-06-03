import React, { createContext, useState, useEffect } from 'react';

// 초기 값 설정
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        email: '',
        authorities: 'USER_ROLE'
    });

    const [dailyStats, setDailyStats] = useState({
        sugarIntake: 0,
        caffeineIntake: 0,
        calorieIntake: 0
    });

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserId = localStorage.getItem('email');

        if (storedIsLoggedIn && storedUserId) {
            setUser({
                isLoggedIn: storedIsLoggedIn === 'true',
                email: storedUserId,
                authorities: 'USER_ROLE' // 기본 권한
            });
        }
    }, []);

    const handleLogin = (email) => {
        setUser({
            isLoggedIn: true,
            email,
            authorities: 'USER_ROLE' // 기본 권한
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', email);
    };

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            email: '',
            authorities: 'USER_ROLE' // 기본 권한
        });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, dailyStats, setDailyStats }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
