import React, { useState } from 'react';
import Modal from './Modal';

const Card = ({ id, title, image, description, full_description, video }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="card" onClick={openModal}>
        <img src={image} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          {/* <p className="card-description">{description}</p> */}
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        id={id}
        title={title}
        full_description={full_description}
        image={image}
        video={video}
      />
    </>
  );
};

export default Card;