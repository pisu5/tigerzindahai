import React from 'react';

const VideoSlider = ({ currentVideoIndex, setCurrentVideoIndex, videoData }) => {
  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="video-slider">
      <button onClick={handlePrevious}>&lt;</button>
      <video controls autoPlay>
        <source src={videoData[currentVideoIndex].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default VideoSlider;
