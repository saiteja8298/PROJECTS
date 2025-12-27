import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import About from '../components/About/About';
import BookGuide from '../pages/BookGuide';
import GuideDetails from '../pages/GuideDetails';
import Chatbot from '../pages/Chatbot';
import Profile from '../pages/Profile';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/guide" element={<BookGuide />} />
      <Route path="/guides/:id" element={<GuideDetails />} />
      <Route path="/search" element={<SearchResultList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chatbot />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
