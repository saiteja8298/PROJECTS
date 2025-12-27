import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonSection from "../shared/commonSection";
import "../styles/tour.css";
import guideData from "../assets/data/guideData";
import GuideCard from "../shared/GuideCard";
import { Container, Row, Col } from "reactstrap";
import Newsletter from "../shared/Newsletter";

const BookGuide = () => {
  const pageCount = Math.ceil(guideData.length / 4);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <CommonSection title="Book a Guide" />

      <section>
        <Container>
          <Row>
            {guideData.slice(page * 4, (page + 1) * 4).map((guide) => (
              <Col lg="4" md="6" sm="12" key={guide.id} className="mb-4">
                <div
                  onClick={() => navigate(`/guides/${guide.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <GuideCard guide={guide} />
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
                    className={`pagination-btn ${
                      page === number ? "active" : ""
                    }`}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default BookGuide;
