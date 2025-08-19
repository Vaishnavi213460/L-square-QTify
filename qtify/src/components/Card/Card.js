import React from 'react';
import Chip from '@mui/material/Chip';
import styles from './Card.module.css';

function Card({ album }) {
  const { image, title, follows } = album;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.albumImage} />
        <div className={styles.chipWrapper}>
          <Chip
            label={`${follows} Follows`}
            size="small"
            className={styles.chip}
          />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Card;