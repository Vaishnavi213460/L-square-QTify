import React from 'react';
import styles from './Search.module.css';
import searchIcon from '../../assets/search-icon.svg';

function Search() {
  return (
    <>
      <form className={styles.wrapper}>
        <input className={styles.search} placeholder="Search a album of your choice"/>
        <button className={styles.searchButton} type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>
    </>

  );
}

export default Search;