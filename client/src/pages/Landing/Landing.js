import React from 'react';

const Landing = () => (
<div className="content-area">
    <div className="container">
        <div className="button-container">
        <a href="/sign_in">
            <button type="button" className="btn wide-btn btn-primary">Sign In</button>
        </a>
        <a href="/create_account">
            <button type="button" className="btn wide-btn btn-primary">Create an Account</button>
        </a>
        </div>
    </div>
</div>
);

export default Landing;