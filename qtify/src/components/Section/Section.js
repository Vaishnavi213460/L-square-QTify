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
    if (overrideData) {
      setData(overrideData);
      return;
    }

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
        {hasShowAll && type !== "song" && (
          <button className={styles.collapseButton} onClick={toggleView}>
            {isCollapsed ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {component}

      {/* RENDER LOGIC FIX: Render songs in a card grid for easier testing and a better UX */}
      {isCollapsed || type === "song" ? (
        <div className={styles.cardGrid}>
          {data.map((item) => (
            <Card key={item.id} data={item} isSong={type === "song"} />
          ))}
        </div>
      ) : (
        <Carousel data={data} type={type} />
      )}
    </div>
  );
}

export default Section;