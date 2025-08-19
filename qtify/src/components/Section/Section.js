import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

function Section() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchTopAlbums() {
      try {
        const response = await axios.get('https://qtify-backend-labs.crio.do/albums/top');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching top albums:', error);
      }
    }

    fetchTopAlbums();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>Top Albums</h3>
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