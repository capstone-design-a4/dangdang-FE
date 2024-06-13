import React, { createContext, useState, useEffect } from 'react';

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
        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        const storedEmail = sessionStorage.getItem('email');

        if (storedIsLoggedIn && storedEmail) {
            setUser({
                isLoggedIn: storedIsLoggedIn === 'true',
                email: storedEmail,
                authorities: 'USER_ROLE'
            });
        }
    }, []);

    const handleLogin = (email) => {
        setUser({
            isLoggedIn: true,
            email,
            authorities: 'USER_ROLE'
        });
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('email', email);
    };

    const handleLogout = () => {
        setUser({
            isLoggedIn: false,
            email: '',
            authorities: 'USER_ROLE'
        });
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('email');
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, dailyStats, setDailyStats }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
