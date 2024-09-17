// src/components/WhatsAppChatIcon.js
import React from 'react';
import "../css/Whatsapp.css"; // Import CSS for stylingW
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppChatIcon = () => {
    return (
      <div className="whatsapp-chat-icon">
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} size="3x" color="#25D366" />
        </a>
      </div>
    );
  };
  
  export default WhatsAppChatIcon;