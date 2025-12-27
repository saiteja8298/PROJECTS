import React from 'react';
import '../../styles/about.css';
import { Container, Row, Col } from 'reactstrap';
import Subtitle from '../../shared/Subtitle';

const About = () => {
  return (
    <>
      {/* About Header */}
      <section className="about__header">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h1 style={{ fontFamily: 'Times New Roman' }}>About WanderConnect</h1>
              <p style={{ fontFamily: 'Times New Roman' }}>
                Welcome to WanderConnect – your AI-powered travel companion that redefines how you explore new places.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Mission Section */}
      <section className="mission__section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="Our Mission" />
              <p style={{ fontFamily: 'Times New Roman' }}>
                At WanderConnect, our mission is to connect travelers with the best local experiences through smart technology.
                We aim to make every trip effortless, safe, and unforgettable by providing access to trustworthy guides and tailored tour packages at your fingertips.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What We Offer Section */}
      <section className="services__section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="What We Offer" />
              <ul style={{ fontFamily: 'Times New Roman' }}>
                <li>AI-Based Travel Guide Booking System</li>
                <li>Customized Tour Packages</li>
                <li>Seamless Booking Experience</li>
                <li>Smart Recommendations Powered by AI</li>
                <li>Affordable Pricing and Transparent Service</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values Section */}
      <section className="values__section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="Our Values" />
              <p style={{ fontFamily: 'Times New Roman' }}>
                We are driven by innovation, honesty, and customer satisfaction. WanderConnect puts the traveler first, using AI to bring trust, simplicity, and excitement to every journey.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Journey Section */}
      <section className="journey__section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="Our Journey" />
              <p style={{ fontFamily: 'Times New Roman' }}>
                WanderConnect began as a passion project to help tourists feel safer and more informed in unfamiliar places.
                Today, we've grown into an intelligent system that assists thousands in finding licensed guides and planning their dream adventures worldwide.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact__section">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 style={{ fontFamily: 'Times New Roman' }}>Get in Touch</h2>
              <p style={{ fontFamily: 'Times New Roman' }}>
                Ready to plan your next trip with WanderConnect? Let’s explore together – smarter, safer, and better than ever.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
