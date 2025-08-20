import React, { useEffect, useState } from "react";
import Section from "../Section/Section";
import styles from "./SongsSection.module.css";

function SongsSection() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  // Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch("https://qtify-backend-labs.crio.do/songs");
      const data = await res.json();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("https://qtify-backend-labs.crio.do/genres");
      const data = await res.json();
      setGenres(["All", ...data.map((genre) => genre.label)]);
    };
    fetchGenres();
  }, []);

  // Filter songs
  const filteredSongs =
    selectedTab === "All"
      ? songs
      : songs.filter((song) => song.genre.label === selectedTab);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Songs</h3>

      {/* Tabs */}
      <div className={styles.tabs}>
        {genres.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              selectedTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section with filtered songs */}
      <Section
        title="Songs"
        overrideData={filteredSongs}  
        type="song"                  
        hasShowAll={false}         
      />
    </div>
  );
}

export default SongsSection;
