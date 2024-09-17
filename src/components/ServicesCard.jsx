// OurServicesSection.js

import React from "react";
import ServiceCard from "./Services";
import "../css/servicesCard.css";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import CheckroomSharpIcon from '@mui/icons-material/CheckroomSharp';
import "../css/icons.css"

const OurServicesSection = () => {
  // Sample service data
  const services = [
    {
      icon: <LocalShippingIcon className="icons"/>,
      title: "Free Shipping",
      description: "",
    },
    {
      icon: <KeyboardReturnSharpIcon className="icons"/>,
      title: "7 Days Return Policy",
      description: "",
    },
    {
      icon: <RateReviewSharpIcon className="icons"/>,
      title: "Customer Review",
      description: "",
    },
    {
      icon: <CheckroomSharpIcon className="icons"/>,
      title: "Qulity Products",
      description: "",
    },
  ];

  return (
    <section className="our-services">
      <div className="container">
        <h2></h2>
        <div className="service-cards">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
