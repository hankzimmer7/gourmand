import React from 'react';
import Title from '../../components/GourmandHeading';

const Landing = () => (

<div class="landing-container">
    <Title />
    <div className="button-container">
    <a href="/sign_in">
        <button type="button" className="btn btn-primary">Sign In</button>
    </a>
    <a href="/create_account">
        <button type="button" className="btn btn-primary">Create an Account</button>
    </a>
    </div>
</div>
);

export default Landing;