import React from 'react';
import { useLocation } from 'react-router-dom';
import guideData from '../assets/data/guideData';
import tourData from '../assets/data/tours';
import GuideCard from '../shared/GuideCard';
import TourCard from '../shared/TourCard';
import '../shared/search-bar.css';

const SearchResultList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query')?.toLowerCase() || '';

  const filteredGuides = guideData.filter((guide) =>
    guide.name?.toLowerCase().includes(searchTerm)
  );

  const filteredTours = tourData.filter((tour) =>
    tour.title?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-result-container">
      <h2>Search Results for: "{searchTerm}"</h2>

      {filteredGuides.length > 0 && (
        <>
          <h3>Guides</h3>
          <div className="guide-results">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </>
      )}

      {filteredTours.length > 0 && (
        <>
          <h3>Tours</h3>
          <div className="tour-results">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}

      {filteredGuides.length === 0 && filteredTours.length === 0 && (
        <p>No matching results found.</p>
      )}
    </div>
  );
};

export default SearchResultList;
