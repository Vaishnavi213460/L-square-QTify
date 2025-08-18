import React from 'react';
import headphonesImage from '../../assets/headphones.png'; 
import styles from './Hero.module.css';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.textContainer}>
        <h1>100 Thousand Songs, ad-free</h1>
        <h2>Over thousands podcast episodes</h2>
      </div>
      <div className={styles.imageContainer}>
        <img 
          src={headphonesImage} 
          alt="Headphones"
          className={styles.headphones} 
        />
      </div>
    </div>
  );
}

export default Hero;