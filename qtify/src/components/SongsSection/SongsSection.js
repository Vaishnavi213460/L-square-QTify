// src/components/SongsSection/SongsSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import Section from "../Section/Section";

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState("all");

  // Fetch songs
  useEffect(() => {
    axios
      .get("https://qtify-backend-labs.crio.do/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching songs", err));
  }, []);

  // Fetch genres
  useEffect(() => {
    axios
      .get("https://qtify-backend-labs.crio.do/genres")
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.error("Error fetching genres", err));
  }, []);

  // Filter songs by genre
  const filteredSongs =
    activeGenre === "all"
      ? songs
      : songs.filter((song) => song.genre.key === activeGenre);

  return (
    <Section
      title="Songs"
      hasShowAll={false} // hide show all button for songs
      type="song"
      overrideData={filteredSongs} // pass filtered list directly
      component={
        <Tabs
          value={activeGenre}
          onChange={(e, newValue) => setActiveGenre(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              marginRight: "16px",
            },
            "& .Mui-selected": {
              color: "#34C94B !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#34C94B",
              height: "3px",
              borderRadius: "2px",
            },
          }}
        >
          <Tab label="All" value="all" />
          {genres.map((genre) => (
            <Tab key={genre.key} label={genre.label} value={genre.key} />
          ))}
        </Tabs>
      }
    />
  );
}

export default SongsSection;
