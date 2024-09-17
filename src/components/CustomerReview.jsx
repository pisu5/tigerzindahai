import React from 'react';
import "../css/Customerreview.css"; // Ensure the path is correct

const reviews = [
  {
    text: "Great product! Highly recommended.",
    rating: 5
  },
  {
    text: "Good value for money.",
    rating: 4
  },
  {
    text: "Average quality, but decent for the price.",
    rating: 3
  },
  {
    text: "Not satisfied with the product.",
    rating: 2
  },
  {
    text: "Terrible experience. Do not buy!",
    rating: 1
  }
];

const CustomerReviews = () => {
  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      <div className="reviews-scroll">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review.text}</p>
            <div className="rating-bar">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < review.rating ? 'filled' : ''}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
