import React from 'react';
import './Navbar.css';

const Title = () => (

<nav className="navbar navbar-expand-md navbar-light bg-light">
    <a className="navbar-brand " href="/">
        <h1 className="brand">Gourmand</h1>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="/dishes">Dishes</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/restaurants">Restaurants</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/Profile">Profile</a>
      </li>
    </ul>
  </div>
</nav>
)

export default Title;