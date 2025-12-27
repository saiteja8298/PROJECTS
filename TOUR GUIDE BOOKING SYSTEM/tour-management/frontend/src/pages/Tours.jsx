import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CommonSection from "../shared/commonSection";
import "../styles/tour.css";
import tourData from "../assets/data/tours";
import TourCard from "../shared/TourCard";
import { Container, Row, Col } from "reactstrap";
import Newsletter from "../shared/Newsletter";

// Country images mapping
const countryImages = {
  Spain: ["/assets/images/spain_1.webp", "/assets/images/spain_2.jpeg", "/assets/images/spain_3.jpg", "/assets/images/spain_4.jpeg"],
  Germany: ["/assets/images/germany_1.jpeg", "/assets/images/germany_2.jpeg", "/assets/images/germany_3.jpg", "/assets/images/germany_4.jpg"],
  China: ["/assets/images/china_1.jpg", "/assets/images/china_2.jpg", "/assets/images/china_3.jpeg", "/assets/images/china_4.jpg"],
  Japan: ["/assets/images/japan_1.jpeg", "/assets/images/japan_2.jpeg", "/assets/images/japan_3.jpg", "/assets/images/japan_4.jpeg"],
  India: ["/assets/images/india_1.png", "/assets/images/india_2.jpg", "/assets/images/india_3.jpeg", "/assets/images/india_4.jpg"],
  Italy: ["/assets/images/italy_1.jpeg", "/assets/images/italy_2.jpeg", "/assets/images/italy_3.webp", "/assets/images/italy_4.jpg"],
  France: ["/assets/images/france_1.jpg", "/assets/images/france_2.jpg", "/assets/images/france_3.jpg", "/assets/images/france-4.webp"],
  Thailand: ["/assets/images/thai_1.webp", "/assets/images/thai_2.webp", "/assets/images/thai_3.jpg", "/assets/images/thai_4.jpg"],
  UnitedKingdom: ["/assets/images/uk_1.jpg", "/assets/images/uk_2.jpg", "/assets/images/uk_3.jpg", "/assets/images/uk_4.jpg"],
  Indonesia: ["/assets/images/indonesia1.jpg", "/assets/images/indonesia2.jpg", "/assets/images/indonesia3.jpg", "/assets/images/indonesia4.jpg"],
};

const Tours = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCountry = queryParams.get("country");

  const filteredTours = selectedCountry
    ? tourData.filter((tour) => tour.country === selectedCountry)
    : tourData;

  const pageCount = Math.ceil(filteredTours.length / 4);
  const [page, setPage] = useState(0);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
  };

  return (
    <>
      <CommonSection title={selectedCountry ? `${selectedCountry} Tours` : "All Tours"} />

      {selectedCountry && countryImages[selectedCountry] && (
        <section className="country-banner">
          <Container>
            <Row className="g-4">
              {countryImages[selectedCountry].map((img, index) => (
                <Col lg="3" md="6" sm="6" key={index}>
                  <img src={img} alt={`${selectedCountry} ${index + 1}`} className="country-image" />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <section>
        <Container>
          <Row>
            {filteredTours.slice(page * 4, (page + 1) * 4).map((tour) => (
              <Col lg="4" md="6" sm="12" key={tour.id} className="mb-4">
                <div onClick={() => handleTourClick(tour)} style={{ cursor: "pointer" }}>
                  <TourCard tour={tour} showBookingInfo={true} />
                </div>
              </Col>
            ))}
          </Row>

          {pageCount > 1 && (
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={`pagination-btn ${page === number ? "active" : ""}`}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          )}
        </Container>
      </section>

      {selectedTour && (
        <div className="tour-details">
          <h2>{selectedTour.title}</h2>
          <p>{selectedTour.description}</p>
          <img src={selectedTour.image} alt={selectedTour.title} />
        </div>
      )}

      <Newsletter />
    </>
  );
};

export default Tours;
