import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Container } from '../ui/containers';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  const cardSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true, // Enable swiping to slide on touch devices
    touchThreshold: 10, // Adjust the touch sensitivity as needed
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Adjust the speed in milliseconds
  };

  useEffect(() => {
    // Fetch carousel items using Axios
    const fetchCarouselItems = async () => {
      try {
        const totalPages = 10; // Set the number of pages you want to fetch
        let newCarouselItems = [];
    
        // Fetch data for each page
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              language: 'en-US',
              sort_by: 'release_date.desc',
              page: page, // Specify the page number
            },
          });
    
          // For each movie, check if there are videos available using the /movie/{id}/videos endpoint
          const moviesWithVideos = await Promise.all(
            response?.data?.results.map(async (item) => {
              const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_API_KEY,
                  language: 'en-US',
                },
              });

              // Check if there are videos available
              const hasVideos = videoResponse?.data?.results.length > 0;

              // If there are videos, include the movie in the newCarouselItems array
              if (hasVideos && item.poster_path != null) {
                console.log(item?.poster_path)
                return {
                  id: item?.id,
                  image: 'https:image.tmdb.org/t/p/original' + item?.poster_path,
                  title: item?.original_title,
                  description: item.overview?.length > 300 ? `${item?.overview.slice(0, 300)}...` : item?.overview,
                  full_description: item?.overview,
                  video: videoResponse?.data?.results[0]?.key, // Assuming you want to use the key of the first video
                };
              }

              return null;
            })
          );

          // Remove null values (movies without videos) and add to the newCarouselItems array
          newCarouselItems = [...newCarouselItems, ...moviesWithVideos.filter(Boolean)];
        }
    
        const limitedCarouselItems = newCarouselItems.slice(0, 4);
    
        setCarouselItems(limitedCarouselItems);
        setLatestItems(newCarouselItems);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      }
    };

    // Fetch action items using Axios
    const fetchActionItems = async () => {
      try {
        const totalPages = 10; // Set the number of pages you want to fetch
        let newActionItems = [];
    
        // Fetch data for each page
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              language: 'en-US',
              sort_by: 'release_date.desc',
              page: page, // Specify the page number
              with_genres: 28
            },
          });
    
          // For each movie, check if there are videos available using the /movie/{id}/videos endpoint
          const moviesWithVideos = await Promise.all(
            response?.data?.results.map(async (item) => {
              const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_API_KEY,
                  language: 'en-US',
                },
              });

              // Check if there are videos available
              const hasVideos = videoResponse?.data?.results.length > 0;

              // If there are videos, include the movie in the newCarouselItems array
              if (hasVideos && item.poster_path != null) {
                console.log(item?.poster_path)
                return {
                  id: item?.id,
                  image: 'https:image.tmdb.org/t/p/original' + item?.poster_path,
                  title: item?.original_title,
                  description: item.overview?.length > 300 ? `${item?.overview.slice(0, 300)}...` : item?.overview,
                  full_description: item?.overview,
                  video: videoResponse?.data?.results[0]?.key, // Assuming you want to use the key of the first video
                };
              }

              return null;
            })
          );

          // Remove null values (movies without videos) and add to the newCarouselItems array
          newActionItems = [...newActionItems, ...moviesWithVideos.filter(Boolean)];
        }
        setActionItems(newActionItems);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      }
    };

    fetchCarouselItems();
    fetchActionItems();
  }, []); 


  return (
    <>
     <Layout pageTitle="Home Page">
        <Container>
          <div className="container mx-auto mt-8">
            <div className="mt-4">
              {carouselItems.length !== 0 && <Carousel items={carouselItems} />}
            </div>
            <div className="mt-8">
              <h2 className="type-label">Latest</h2>
              <Slider {...cardSettings} className="card-carousel">
                {latestItems.map((value, index) => (
                  <Card key={index} {...value} />
                ))}
              </Slider>
            </div>
            <div className="mt-8">
              <h2 className="type-label">Action</h2>
              {/* Display latest items in a sliding carousel */}
              {actionItems.length > 0 && (
                <Slider {...cardSettings} className="card-carousel">
                  {actionItems.map((value, index) => (
                    <Card key={index} {...value} />
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Home;