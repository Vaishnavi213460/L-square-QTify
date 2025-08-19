// src/components/Section/Section.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";
import Carousel from "../Carousel/Carousel";

function Section({
  title,
  apiEndpoint,
  hasShowAll = true,
  type = "album",
  component,
  overrideData, 
}) {
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // If overrideData is provided, use it directly
    if (overrideData) {
      setData(overrideData);
      return;
    }

    // Otherwise, fetch from API (albums, etc.)
    if (apiEndpoint) {
      async function fetchData() {
        try {
          const response = await axios.get(apiEndpoint);
          setData(response.data);
        } catch (error) {
          console.error(`Error fetching ${title} data:`, error);
        }
      }
      fetchData();
    }
  }, [apiEndpoint, title, overrideData]);

  const toggleView = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {/* Show All button only for albums */}
        {hasShowAll && type !== "song" && (
          <button className={styles.collapseButton} onClick={toggleView}>
            {isCollapsed ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {/* Tabs or any extra component (used for Songs filter) */}
      {component}

      {/* Render logic */}
      {type === "song" ? (
        // Songs → always Carousel, no grid
        <Carousel data={data} type={type} />
      ) : isCollapsed ? (
        // Albums (grid view after clicking Show All)
        <div className={styles.cardGrid}>
          {data.map((item) => (
            <Card key={item.id} data={item} isSong={false} />
          ))}
        </div>
      ) : (
        // Albums (default carousel view)
        <Carousel data={data} type={type} />
      )}
    </div>
  );
}

export default Section;
