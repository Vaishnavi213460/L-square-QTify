import React from 'react';
import Chip from '@mui/material/Chip';
import styles from './Card.module.css';

// The component now accepts a 'data' prop and a new 'isSong' prop
function Card({ data, isSong }) {
  // Use data prop for flexibility
  const { image, title } = data;

  // Conditionally set the label and count based on the 'isSong' prop
  const label = isSong ? "Likes" : "Follows";
  const count = isSong ? data.likes : data.follows;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.albumImage} />
        <div className={styles.chipWrapper}>
          <Chip
            label={`${count} ${label}`}
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