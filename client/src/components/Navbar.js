import React from 'react';
import './Navbar.css';

const Title = () => (

<nav className="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand " href="/">
        <h1 className="brand">Gourmand</h1>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/dishes">Dishes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/restaurants">Restaurants</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/Profile">Profile</a>
      </li>
    </ul>
  </div>
</nav>
)

export default Title;