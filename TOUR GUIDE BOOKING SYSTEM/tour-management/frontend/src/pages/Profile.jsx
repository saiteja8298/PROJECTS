import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/profile.css'; // Importing external CSS
import coverImage from '../assets/guides/cover.png';  // Ensure the path is correct
import defaultProfile from '../assets/guides/default.png';

const Profile = () => {
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
    if (userData) {
      fetch('http://localhost:8080/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Profile response:', data);
        })
        .catch(err => {
          console.error('Profile error:', err);
        });
    }
  }, [userData]);

  return (
    <div className="profile-container">
      {/* Cover Image */}
      <div className="profile-cover"></div>

      {/* Profile Section */}
      <div className="profile-card">
        <img src={defaultProfile} alt="Profile" className="profile-img" />
        <div className="profile-details">
          <h1>{userData?.username || 'User'}</h1>
          <p>📧 {userData?.email || 'Email not available'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
