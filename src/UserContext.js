import React, { createContext, useState, useEffect } from 'react';

// 초기 값 설정
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        userId: '',
        authorities: 'USER_ROLE'
    });

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserId = localStorage.getItem('userId');

        if (storedIsLoggedIn && storedUserId) {
            setUser({
                isLoggedIn: storedIsLoggedIn === 'true',
                userId: storedUserId,
                authorities: 'USER_ROLE' // 기본 권한
            });
        }
    }, []);

    const handleLogin = (userId) => {
        setUser({
            isLoggedIn: true,
            userId,
            authorities: 'USER_ROLE' // 기본 권한
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId);
    };

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            userId: '',
            authorities: 'USER_ROLE' // 기본 권한
        });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
