import React from 'react';

function Logo({ message }) {
    return (
        <div className="logo">
            <div className="center_logo">
                <img src="당당이.png" alt="로고" className="logo_img" />
                <div className="logo_ment" style={{ fontWeight: "bold" }}>당당</div>
            </div>
            <div className="logo_message">
                <div>{message}</div>
                <div>오늘도 당당하게</div>
            </div>
        </div>
    );
}

export default Logo;
