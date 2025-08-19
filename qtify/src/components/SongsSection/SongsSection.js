// src/components/SongsSection/SongsSection.js
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section from "../Section/Section";
import styles from "./SongsSection.module.css";
import axios from 'axios';
import Carousel from "../Carousel/Carousel"; // <-- Import Carousel

const API_SONGS = "https://qtify-backend-labs.crio.do/songs";
const API_GENRES = "https://qtify-backend-labs.crio.do/genres";

const SongsSection = () => {
  const [value, setValue] = useState(0);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([{ key: "all", label: "All" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await axios.get(API_SONGS);
        setSongs(songsResponse.data);

        const genresResponse = await axios.get(API_GENRES);
        setGenres([{ key: "all", label: "All" }, ...genresResponse.data.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFilteredSongs = () => {
    if (genres.length > 0 && genres[value]?.key === "all") {
      return songs;
    } else {
      return songs.filter((song) => song.genre.key === genres[value]?.key);
    }
  };

  const filteredSongs = getFilteredSongs();

  // Create the Tabs component to pass as a prop
  const tabsComponent = (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="songs genre tabs"
        className={styles.tabs}
        TabIndicatorProps={{ className: styles.tabIndicator }}
      >
        {genres.map((genre, index) => (
          <Tab
            key={genre.key}
            label={genre.label}
            className={`${styles.tab} ${value === index ? styles.tabSelected : ''}`}
          />
        ))}
      </Tabs>
    </Box>
  );

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>Songs</h3>
      </div>
      {tabsComponent}
      <Carousel data={filteredSongs} type="song" />
    </div>
  );
};

export default SongsSection;