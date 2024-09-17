import React from "react";


const Avtar = ({ image, onClick }) => {
  return (
    <section className="avatar-detail ggg" onClick={onClick}>
      <div className="avatar-box">
        <img className="avatar-profile-image" src={image.img} alt="" />
      </div>
      <p className="avatar-name">{image.name}</p>
    </section>
  );
};
export default Avtar;
