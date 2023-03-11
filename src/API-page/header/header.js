import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={isScrolled ? 'header scrolled' : 'header'}>
      <div className="logo">
        <Link to="/">My Site</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/users-posts">Posts</Link>
          </li>
          <li>
            <Link to="/users-albums">Gallery</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
