import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid } from '@mui/material';
import Modal from './Modal';

const Carousel = ({ items }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed in milliseconds
  };

  return (
    <>
      <Slider {...settings} className="border-2 rounded-md bg-gray-400 w-full carousel-container">
        {items.map((item, index) => (
          <div key={index} className="carousel-slide" onClick={() => openModal(item)}>
            <Grid container>
              <Grid item xs={6}>
                <img src={item.image} alt={`Slide ${index + 1}`} className="w-full h-full carousel-img object-cover rounded-md" />
              </Grid>
              <Grid item xs={6}>
                <div className="p-8">
                  <h2 className="text-base font-bold mb-4">{item.title}</h2>
                  <p className="text-sm">{item.description}</p>
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
      </Slider>
      {selectedItem && (
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          id={selectedItem.id}
          title={selectedItem.title}
          full_description={selectedItem.full_description}
          image={selectedItem.image}
          video={selectedItem.video}
        />
      )}
    </>
  );
};

export default Carousel;