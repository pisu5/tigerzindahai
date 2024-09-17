import React, { useState } from "react";
import Stories from "react-insta-stories";
import Loader from "./Loader";
import "../css/StoryModal.css";

const ImagesStories = ({ onClose }) => {
  const [showStories, setShowStories] = useState(true);

  const handleStoryEnd = (storyIndex, stories) => {
    if (storyIndex === stories.length - 1) {
      setShowStories(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleClose = () => {
    setShowStories(false);
    if (onClose) {
      onClose();
    }
  };

  const stories = [
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4",
      duration: 3000,
      header: {
        heading: "Man Dancing",
        subheading: "Under changing lights",
        profileImage: "https://via.placeholder.com/100",
      },
    },
    {
      type: "image",
      url: "https://images.pexels.com/photos/9733197/pexels-photo-9733197.jpeg?w=300",
      duration: 4000,
      header: {
        heading: "Beautiful Landscape",
        subheading: "Nature at its best",
        profileImage: "https://via.placeholder.com/100",
      },
    },
    {
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      duration: 2800,
      header: {
        heading: "Yellow Flowers",
        subheading: "In full bloom",
        profileImage: "https://via.placeholder.com/100",
      },
    },
  ];

  return (
    <div className="story-modal">
      {showStories && (
        <div className="story-container">
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          <Stories
            stories={stories}
            defaultInterval={1500}
            width="100%"
            height="100%"
            loader={<Loader />}
            onStoryEnd={handleStoryEnd}
            storyContainerStyles={{ borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagesStories;
