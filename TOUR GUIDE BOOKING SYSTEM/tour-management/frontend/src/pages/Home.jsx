import React from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroVideo from '../assets/images/hero-video.mp4';
import Subtitle from '../shared/Subtitle';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonal from '../components/Testimonal/Testimonal';
import Newsletter from '../shared/Newsletter';
import About from '../components/About/About';
import guideData from '../assets/data/guideData';
import GuideCard from '../shared/GuideCard';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Know Before You Go'} />
                </div>
                <h1>
                  Traveling opens the door to creating memories
                </h1>
                <p>
                  Picture yourself on a white sandy beach, the sound of waves crashing, and a cool breeze brushing your skin. Whether it’s the Maldives, Bali, or the Bahamas, tropical destinations offer the perfect getaway for relaxation, snorkeling, and sunset views that take your breath away.
                  If your heart races for adventure, explore the majestic Himalayas, hike the Inca Trail to Machu Picchu, or go rock climbing in Yosemite. These destinations offer thrilling experiences, breathtaking landscapes, and memories that will last a lifetime.
                </p>
              </div>
            </Col>
            <Col lg="6" className="hero__video-box">
              <div className="hero__video-container">
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="hero__video"
                ></video>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* Featured Tours Section */}
      <section className="featured-section">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={'Explore'} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      {/* Guide Section */}
      <section className="guide-section">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={'Meet Our Guides'} />
              <h2 className="featured__tour-title">Top-rated Travel Guides</h2>
            </Col>
            {guideData.map((guide) => (
              <Col lg="3" md="6" sm="12" key={guide.id} className="mb-4">
                <GuideCard guide={guide} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  We are a team of experienced professionals who are always ready to serve with dedication, expertise, and a commitment to excellence.
                  <br />
                  Our goal is to provide top-notch solutions tailored to your needs, ensuring quality, innovation, and customer satisfaction in everything we do.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12K+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>2K+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years of Experience</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Gallery'} />
              <h2 className="gallery__title">Visit our customers' tour gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Fans Love'} />
              <h2 className="testimonal__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonal />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* About Section */}
      <section className="about-section">
        <About />
      </section>
    </div>
  );
};

export default Home;
