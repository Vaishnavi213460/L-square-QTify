// src/components/Section/Section.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

// Accept title and API endpoint as props
function Section({ title, apiEndpoint }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiEndpoint);
        setAlbums(response.data);
      } catch (error) {
        console.error(`Error fetching ${title} albums:`, error);
      }
    }
    fetchData();
  }, [apiEndpoint, title]);

  return (
    <div className={styles.section}>
      {/* This is the header that was likely missing */}
      <div className={styles.header}>
        <h3>{title}</h3>
        <button className={styles.collapseButton}>Collapse</button>
      </div>
      <div className={styles.cardGrid}>
        {albums.map((album) => (
          <Card key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Section;