import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating"; // Ensure this function exists

const TourCard = ({ tour }) => {
  const { id, title, city, photo, price, featured, reviews = [] } = tour;

  // Calculate total rating & average rating using the utility function
  const { avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Card>
        {/* ✅ Clicking Image will now redirect to Tour Details Page */}
        <Link to={`/tours/${id}`} className="tour__img">
          {photo ? (
            <img
              src={photo}
              alt="tour-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300"; // Fallback image
              }}
            />
          ) : (
            <img src="https://via.placeholder.com/300" alt="default-tour-img" />
          )}
          {featured && <span className="featured-badge">Featured</span>}
        </Link>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i> {avgRating}
              {reviews.length > 0 && <span> ({reviews.length})</span>}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per person</span>
            </h5>

            {/* ✅ Booking Button now redirects to Tour Details Page */}
            <button className="btn booking_btn">
              <Link to={`/tours/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
