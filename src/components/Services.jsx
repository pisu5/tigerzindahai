// ServiceCard.js

import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="cutout">
        <i className={`fas fa-heart`}></i>
        <div className="icon">{icon}</div>
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
