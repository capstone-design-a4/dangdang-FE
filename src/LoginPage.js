import React from 'react';
import Logo from './Logo';
import Login from './Login';
import Question from './Question';

function LoginPage() {
    return (
        <div>
            <Logo message="로그인하고" />
            <Login />
            <Question />
        </div>
    );
}

export default LoginPage;
