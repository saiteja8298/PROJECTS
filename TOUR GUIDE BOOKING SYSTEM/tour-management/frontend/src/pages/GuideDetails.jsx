import React from "react";
import { useParams } from "react-router-dom";
import guideData from "../assets/data/guideData";
import CommonSection from "../shared/commonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/guide-details.css";

const GuideDetails = () => {
  const { id } = useParams();
  const guide = guideData.find((g) => g.id === id);

  if (!guide) {
    return (
      <Container>
        <h2>Guide not found</h2>
      </Container>
    );
  }

  return (
    <>
      <CommonSection title="Guide Details" />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={guide.photo} alt={guide.name} className="guide-details-photo" />
            </Col>
            <Col lg="6">
              <div className="guide-details-info">
                <h2>{guide.name}</h2>
                <p><strong>Country:</strong> {guide.country}</p>
                <p><strong>Experience:</strong> {guide.experience}</p>
                <p><strong>Languages:</strong> {guide.languages.join(", ")}</p>
                <p><strong>Rating:</strong> {guide.rating} ⭐</p>
                <p><strong>Description:</strong> {guide.description}</p>
                <hr />
                <h4>Contact Information</h4>
                <p><strong>Email:</strong> {guide.email}</p>
                <p><strong>Phone:</strong> {guide.phone}</p>
                <div className="price-box">
                  <h5>Fee Per Day:</h5>
                  <span>${guide.pricePerDay}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GuideDetails;
