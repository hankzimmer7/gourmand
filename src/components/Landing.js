import React from 'react';
import Title from './Title';

const Landing = () => (

<div class="landing-container">
    <Title />
    <div className="button-container">
    <div>
        <button type="button" className="btn btn-primary">Sign In</button>
    </div>
    <div>
        <button type="button" className="btn btn-primary">Create an Account</button>
        </div>
    </div>
</div>
)

export default Landing;