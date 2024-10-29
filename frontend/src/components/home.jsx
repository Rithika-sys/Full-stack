import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Home Page</h1>
            <h2>Features</h2>
            <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
            </ul>
            <div className="action-links">
                <a href="/some-action">Action 1</a>
                <a href="/another-action">Action 2</a>
            </div>
        </div>
    );
};

export default Home;
