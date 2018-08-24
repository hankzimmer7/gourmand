import React from 'react';

const Navbar = () => (
    <nav class="navbar navbar-light bg-light">
    
        <a href="/dishes">
            <button>Dishes</button>
        </a>
        <a href="/restaurants">
            <button>Restaurants</button>
        </a>
        <a href="/profile">
            <button>Profile</button>
        </a>
    </nav>
);

export default Navbar;