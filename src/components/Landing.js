import React from 'react';
import Title from './Title';

const Landing = () => (

<div class=" container landing-container">
    <Title />
    <div>
        <button type="button" className="btn btn-primary">Sign In</button>
    </div>
    <div>
        <button type="button" className="btn btn-primary">Create an Account</button>
    </div>
</div>
)

export default Landing;