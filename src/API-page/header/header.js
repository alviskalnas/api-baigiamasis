import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
        <Link to="/">2023 Company Name</Link>
      </div>
      <nav>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/users' ? 'active' : ''}>
            <Link to="/users">Users</Link>
          </li>
          <li className={location.pathname === '/users-posts' ? 'active' : ''}>
            <Link to="/users-posts">Posts</Link>
          </li>
          <li className={location.pathname === '/users-albums' ? 'active' : ''}>
            <Link to="/users-albums">Gallery</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


