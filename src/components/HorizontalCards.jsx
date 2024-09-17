import React from 'react';
import "../css/CardContainer.css"; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faUndoAlt, faLock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const CardContainer = () => {
  const cards = [
    {
      icon: faShippingFast,
      heading: "Free Shipping",
      text: "Enjoy free shipping on all orders.",
    },
    {
      icon: faUndoAlt,
      heading: "Hassle Free Returns",
      text: "30-day return policy for your convenience.",
    },
    {
      icon: faLock,
      heading: "100% Secure Payments",
      text: "Your payments are safe and secure with us.",
    },
    {
      icon: faThumbsUp,
      heading: "Trusted by Thousands",
      text: "Our customers love our products.",
    },
  ];

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-icon card-content">
            <FontAwesomeIcon icon={card.icon} size="2x" />
          </div>
          <h3 className="card-heading card-content">{card.heading}</h3>
          <p className="card-content">{card.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
