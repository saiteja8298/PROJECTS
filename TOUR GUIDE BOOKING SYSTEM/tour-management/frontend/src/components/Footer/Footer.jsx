import React from "react";
import "./footer.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaGithub, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const quickLinks = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/tours", label: "Tours" },
];

const discoverLinks = [
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="footer-top">
          {/* Logo & Description */}
          <Col lg="4" md="6">
            <div className="footer-branding">
              <img src={logo} alt="ExploreX Logo" className="footer-logo" />
              <p className="footer-description">
                Discover breathtaking destinations with ExploreX. Travel better, explore deeper, live unforgettable moments.
              </p>
              <div className="social-icons">
                <Link to="#"><FaInstagram /></Link>
                <Link to="#"><FaFacebookF /></Link>
                <Link to="#"><FaYoutube /></Link>
                <Link to="#"><FaGithub /></Link>
                <Link to="#"><FaWhatsapp /></Link>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg="2" md="6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Discover Links */}
          <Col lg="2" md="6">
            <h6 className="footer-heading">Discover</h6>
            <ul className="footer-links">
              {discoverLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg="4" md="6">
            <h6 className="footer-heading">Contact</h6>
            <ul className="footer-contact">
              <li>
                <i className="ri-map-pin-line"></i> Hyderabad, Telangana, India
              </li>
              <li>
                <i className="ri-mail-line"></i>
                <a href="mailto:busamgayathri2005@gmail.com">busamgayathri2005@gmail.com</a>
              </li>
              <li>
                <i className="ri-phone-line"></i>
                <a href="tel:+919182346029">+91 918 234 6029</a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col lg="12" className="text-center">
            <p>&copy; {new Date().getFullYear()} ExploreX. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
