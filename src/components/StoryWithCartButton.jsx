// StoryContent.js
import React from 'react';

const StoryContent = ({ story }) => {
  return (
    <div className="story-content">
      <div className="story-header">
        <div className="story-profile">
          <img src={story.header.profileImage} alt="Profile" className="profile-pic" />
          <span className="profile-name">{story.header.heading}</span>
        </div>
        <div className="story-actions">
          <span className="icon">❤️</span>
        </div>
      </div>
      <div className="story-footer">
        <div className="product-details">
          <p>{story.header.subheading}</p>
          <p className="product-price">₹10,980</p>
        </div>
        <button className="add-to-cart">ADD TO CART</button>
      </div>
    </div>
  );
};

export default StoryContent;
