import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  // State for form inputs
  const [credentials, setCredentials] = useState({
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [id]: id === 'guestSize' || id === 'phone' ? Number(value) || 0 : value,
    }));
  };

  const serviceFee = 10;
  const totalAmount = price * (credentials.guestSize || 1) + serviceFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!credentials.fullName || !credentials.phone || !credentials.bookAt) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Booking successful:', credentials);
    navigate('/thank-you'); // Ensure this route exists in your app
  };

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className='tour__rating d-flex align-items-center'>
          <i className='ri-star-s-fill' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating > 0 && `${avgRating} (${reviews?.length})`}
        </span>
      </div>

      <div className='booking__form'>
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type='text'
              placeholder='Full Name'
              id='fullName'
              value={credentials.fullName}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='number'
              placeholder='Phone'
              id='phone'
              value={credentials.phone}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='date'
              id='bookAt'
              value={credentials.bookAt}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type='number'
              placeholder='Guest Size'
              id='guestSize'
              value={credentials.guestSize}
              min='1'
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Button className='btn primary__btn w-100 mt-4' type='submit'>
            Book Now
          </Button>
        </Form>
      </div>

      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0 d-flex justify-content-between'>
            <h5>
              ${price} <i className='ri-close-line'></i> {credentials.guestSize} person(s)
            </h5>
            <span>${price * (credentials.guestSize || 1)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 d-flex justify-content-between'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total d-flex justify-content-between'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
