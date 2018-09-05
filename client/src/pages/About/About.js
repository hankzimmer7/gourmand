import React from 'react';

const About = () => (
    <div className="content-area">
        <div className="container">
            <div className="jumbotron">
                <p className="lead">Gourmand is here to help you find your favorite dishes!</p>
                <ul>
                    <li>
                        <p>Search for a specific food dish and see what nearby restaurants serve that dish</p>
                    </li>
                    <li>
                        <p>Read user reviews for individual dishes</p>
                    </li>
                    <li>
                        <p>View the menus of nearby restaurants and see how other users have rated each dish on the menu</p>
                    </li>
                </ul>
                <hr className="my-4"/>
                <a className="btn" target="_blank" rel="noopener noreferrer" href="https://github.com/hankzimmer7/gourmand" role="button">
                    See the code on GitHub
                </a>
            </div>
        </div>
    </div>
);

export default About;