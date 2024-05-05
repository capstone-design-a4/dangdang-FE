import React from 'react';
import Logo from './Logo';
import SignUp from './SignUp';
import Question from './Question';

function SignUpPage() {
    return (
        <div>
            <Logo message="회원가입하고" />
            <SignUp />
            <Question />
        </div>
    );
}

export default SignUpPage;