import React, { useRef, useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import Chatbot from '../../pages/Chatbot'; // Updated import path for Chatbot component

const nav_links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/guide', display: 'Book Guide' },
  { path: '/chat', display: 'Chat' },  // Added Chat link
];

const Header = () => {
  const headerRef = useRef(null);
  const [chatVisible, setChatVisible] = useState(false);

  const stickHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickHeaderFunc);
    return () => window.removeEventListener('scroll', stickHeaderFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center gap-2">
              <img src={logo} alt="Logo" />
              <h2 className="project_title">WanderConnect</h2>
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-4">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'active__link' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <li className="nav_item">
                  <NavLink to="/login" className={({ isActive }) => (isActive ? 'active__link' : '')}>
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-3">
              {/* Search bar removed */}

              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
