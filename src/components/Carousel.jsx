import React, { useState } from 'react';
import Avtar from './Avtar';
import '../css/Carousel.css';
import { statusCarousel } from '../data/Story';
import ImagesStories from './Imagies';

const Carousel = () => {
  const [showImagesStories, setShowImagesStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleAvatarClick = (story) => {
    setSelectedStory(story);
    setShowImagesStories(true);
  };

  const handleCloseImagesStories = () => {
    setShowImagesStories(false);
    setSelectedStory(null);
  };

  return (
    <section className="check">
      <div className="carousel-body">
        {statusCarousel.map((item, index) => (
          <Avtar
            key={index}
            image={item}
            onClick={() => handleAvatarClick(item)}
          />
        ))}
      </div>
      {showImagesStories && selectedStory && (
        <ImagesStories story={selectedStory} onClose={handleCloseImagesStories} />
      )}
    </section>
  );
};

export default Carousel;
