import React from 'react';
import './GourmandHeading.css';

const Title = () => (

<nav class="navbar navbar-light bg-light">
    <a href="/">
        <h1 class="brand">Gourmand Test1</h1>
    </a>
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
)

export default Title;