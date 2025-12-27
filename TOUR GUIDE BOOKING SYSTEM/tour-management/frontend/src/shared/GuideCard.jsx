import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/guide-card.css";

const GuideCard = ({ guide }) => {
  const { id, name, country, photo, pricePerDay, rating } = guide;

  return (
    <Card className="guide__card">
      <div className="guide__img">
        <img src={photo} alt={name} className="w-100" />
      </div>

      <CardBody>
        <div className="guide__card-top d-flex justify-content-between align-items-center">
          <span className="guide__location d-flex align-items-center gap-1">
            <i className="ri-map-pin-line"></i> {country}
          </span>
          <span className="guide__rating d-flex align-items-center gap-1">
            <i className="ri-star-fill"></i> {rating}
          </span>
        </div>

        <h5 className="guide__title">{name}</h5>

        <div className="guide__card-bottom d-flex justify-content-between align-items-center mt-3">
          <h5>
            ${pricePerDay} <span>/day</span>
          </h5>
          <button className="btn booking__btn">
          <Link to={`/guides/${guide.id}`} className="view-profile-btn">
          View Profile
        </Link>
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default GuideCard;
