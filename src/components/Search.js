import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Container } from '../ui/containers';
import Card from '../components/Card';
import axios from 'axios';
import { Grid } from '@mui/material';

const Search = (data) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const totalPages = 10; // Set the number of pages you want to fetch
    let newItems = [];

    const fetchSearchResults = async () => {
      try {
        // Fetch data for each page
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              language: 'en-US',
              query: data?.data?.length > 500 ? `${data?.data.slice(0, 500)}` : data?.data,
              page: page, // You can implement pagination if needed
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

              // If there are videos, include the movie in the newItems array
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

          // Remove null values (movies without videos) and add to the newItems array
          newItems = [...newItems, ...moviesWithVideos.filter(Boolean)];
        }

        setSearchResults(newItems);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (data) {
      fetchSearchResults();
    } else {
      // Clear the results if the search term is empty
      setSearchResults([]);
    }
  }, [data]);

  return (
    <>
        <Container>
          <div className="mt-4">
            <h2 className="type-label">Search</h2>
          </div>
          <div className="mt-8">
            {/* Use Grid container for the search results */}
            <Grid container spacing={3}>
              {searchResults.map((value, index) => (
                // Each item takes 3 columns on small screens, 4 columns on medium, and 6 columns on large
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card {...value} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
    </>
  );
};

export default Search;