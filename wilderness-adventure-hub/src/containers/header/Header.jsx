import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Blue Wagon</h1>
      <p>Greetings from our delightful hotel, where comfort and elegance coexist. Our company's motto is "Creating Unforgettable Moments," and we work hard to exceed your expectations by giving you a superior experience.</p>

     

      
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
