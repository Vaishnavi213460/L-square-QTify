// src/components/Section/Section.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';
import Carousel from '../Carousel/Carousel';

// Accept a 'component' prop which will be rendered below the header
function Section({ title, apiEndpoint, hasShowAll = true, type = "album", component }) {
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${title} data:`, error);
      }
    }
    fetchData();
  }, [apiEndpoint, title]);

  const toggleView = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {/* Conditionally render the "Show All" button */}
        {hasShowAll && (
          <button className={styles.collapseButton} onClick={toggleView}>
            {isCollapsed ? "Show All" : "Collapse"}
          </button>
        )}
      </div>

      {/* Render the component prop, which will be the Tabs component */}
      {component}

      {isCollapsed ? (
        <Carousel data={data} type={type} />
      ) : (
        <div className={styles.cardGrid}>
          {data.map((item) => (
            <Card key={item.id} data={item} isSong={type === "song"} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;