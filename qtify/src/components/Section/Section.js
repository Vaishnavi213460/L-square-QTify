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
  filter, // optional filter function
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

  
  let filteredData = data;
  if (filter) {
    if (typeof filter === "function") {
      filteredData = data.filter(filter);
    } else if (typeof filter === "string" && filter.toLowerCase() === "all") {
      filteredData = data; // "all" means no filtering
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 style={type === "song" ? { color: "white" } : {}}>{title}</h3>
        {/* Show All / Collapse only for albums */}
        {hasShowAll && type !== "song" && (
          <button className={styles.collapseButton} onClick={toggleView}>
            {isCollapsed ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {/* Optional custom component (Tabs etc.) */}
      {component}

      {/* ✅ Logic fixed */}
      {hasShowAll && type !== "song" ? (
        isCollapsed ? (
          <div className={styles.cardGrid}>
            {filteredData.map((item) => (
              <Card key={item.id} data={item} isSong={type === "song"} />
            ))}
          </div>
        ) : (
          <Carousel data={filteredData} type={type} />
        )
      ) : (
        <Carousel data={filteredData} type={type} />
      )}
    </div>
  );
}

export default Section;
