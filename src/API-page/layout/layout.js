import React from 'react';
import './layout.scss';
import Image from '../images/ppt-background-image-1910581.png';


const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="left-column">
        <img className="left" src={Image} alt="Left column" />
      </div>
      <div className="right-column">
        <img className="right" src={Image} alt="Right column" />
      </div>
      {children}
    </div>
  );
}

export default Layout;
