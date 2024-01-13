import React from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';

Modal.setAppElement('#__next'); // Set the root element for screen readers

const CustomModal = ({ isOpen, onRequestClose, id, title, full_description, image, video }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <button className="close-btn" onClick={onRequestClose}>
        <XIcon className="h-6 w-6" />
      </button>
      {video && (
        <iframe
          className="modal-video"
          src={`https://www.youtube.com/embed/${video}`}
          title="YouTube Video Player"
          allowFullScreen
        ></iframe>
      )}
      <h2 className="modal-title">{title}</h2>
      <p>{full_description}</p>
    </Modal>
  );
};

export default CustomModal;