import React, { useRef, useState } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { RiStarFill, RiMapPinFill, RiMoneyDollarCircleLine, RiGroupLine } from "react-icons/ri";
import tourData from '../assets/data/tours';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Convert `id` to a number to match tour IDs in `tourData`
  const tour = tourData.find((tour) => tour.id.toString() === id);
   console.log("Selected Tour Data:", tour);

  console.log("Found Tour:", tour);

  if (!tour) {
    return <h2>Tour not found</h2>;
  }

  const { photo, title, desc, price, address, distance, maxGroupSize } = tour;
  const { avgRating } = calculateAvgRating(tour.reviews || []);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Handle Review Submission
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!tourRating) {
      alert("Please select a star rating before submitting.");
      return;
    }
    const { reviews = [] } = tour || {};
    console.log("Reviews Data:", reviews);


    const newReview = {
      name: "User",  // Change this to dynamic user name when authentication is implemented
      rating: tourRating,
      comment: reviewText,
      date: new Date().toLocaleDateString('en-US', options),
    };

    setReviews([...reviews, newReview]);
    reviewMsgRef.current.value = '';
    setTourRating(null);
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="Tour" className="tour__image" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <RiStarFill style={{ color: 'var(--secondary-color)' }} /> {avgRating}⭐
                      {tour.reviews?.length > 0 && <span> ({tour.reviews.length} reviews)</span>}
                    </span>

                    <span>
                      <RiMapPinFill /> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <RiMoneyDollarCircleLine /> ${price} /per person
                    </span>
                    <span>
                      <RiMapPinFill /> {distance} km
                    </span>
                    <span>
                      <RiGroupLine /> {maxGroupSize} people
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* Reviews Section */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews.length + (tour.reviews?.length || 0)})</h4>

                  {/* Review Form */}
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          onClick={() => setTourRating(star)}
                          className={`rating-star ${tourRating === star ? 'selected' : ''}`}
                        >
                          ⭐{star}
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                      <button className="btn primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>

                  {/* Display User Reviews */}
                  <ListGroup className="user__reviews">
                    {tour.reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="User" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.name || 'Anonymous'}</h5>
                              <p>{new Date().toLocaleDateString('en-US', options)}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              ⭐{review.rating}
                            </span>
                          </div>
                          <h6>{review.comment}</h6>
                        </div>
                      </div>
                    ))}

                    {reviews.map((review, index) => (
                      <div className="review__item" key={`user-${index}`}>
                        <img src={avatar} alt="User" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.name}</h5>
                              <p>{review.date}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              ⭐{review.rating}
                            </span>
                          </div>
                          <h6>{review.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            {/* Booking Component */}
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
